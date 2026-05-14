const pool = require('../config/Db');

const createInvestor = async ({ first_name, last_name, email, phone, pan_number }) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const existing = await client.query(
      `SELECT email, phone, pan_number
       FROM investors
       WHERE email = $1
          OR ($2::varchar IS NOT NULL AND phone = $2)
          OR ($3::varchar IS NOT NULL AND pan_number = $3)`,
      [email, phone || null, pan_number || null]
    );
    if (existing.rows.length > 0) {
      const duplicate = existing.rows[0];
      let message = 'Investor already exists';

      if (duplicate.email === email) {
        message = 'Investor with this email already exists';
      } else if (phone && duplicate.phone === phone) {
        message = 'Investor with this phone already exists';
      } else if (pan_number && duplicate.pan_number === pan_number) {
        message = 'Investor with this PAN already exists';
      }

      const err = new Error(message);
      err.status = 400;
      throw err;
    }

    const result = await client.query(
      `INSERT INTO investors (first_name, last_name, email, phone, pan_number)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [first_name, last_name, email, phone || null, pan_number || null]
    );

    const investor = result.rows[0];
    await client.query(
      'INSERT INTO portfolios (investor_id, portfolio_name) VALUES ($1, $2)',
      [investor.investor_id, 'Default Portfolio']
    );

    await client.query('COMMIT');
    return investor;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

const getAllInvestors = async ({ page = 1, limit = 10 }) => {
  const pageNumber = parseInt(page, 10) || 1;
  const limitNumber = parseInt(limit, 10) || 10;
  const offset = (pageNumber - 1) * limitNumber;
  const result = await pool.query(
    `SELECT i.*, COUNT(s.sip_id) AS total_sips
     FROM investors i
     LEFT JOIN sips s ON s.investor_id = i.investor_id
     GROUP BY i.investor_id
     ORDER BY i.created_at DESC
     LIMIT $1 OFFSET $2`,
    [limitNumber, offset]
  );

  const countResult = await pool.query('SELECT COUNT(*) FROM investors');
  return {
    data: result.rows,
    total: parseInt(countResult.rows[0].count),
    page: pageNumber,
    limit: limitNumber,
  };
};

const getInvestorById = async (investor_id) => {
  const result = await pool.query('SELECT * FROM investors WHERE investor_id = $1', [investor_id]);
  if (result.rows.length === 0) {
    const err = new Error('Investor not found');
    err.status = 404;
    throw err;
  }
  return result.rows[0];
};

const getHoldings = async (investor_id) => {
  // Verify investor exists
  await getInvestorById(investor_id);

  // Sum units per fund from all transactions
  const result = await pool.query(
    `SELECT
       mf.fund_id,
       mf.fund_name,
       mf.fund_type,
       mf.latest_nav,
       SUM(it.units_allocated) AS units_held
     FROM investment_transactions it
     JOIN mutual_funds mf ON mf.fund_id = it.fund_id
     WHERE it.investor_id = $1
     GROUP BY mf.fund_id, mf.fund_name, mf.fund_type, mf.latest_nav
     HAVING SUM(it.units_allocated) > 0`,
    [investor_id]
  );

  const holdings = result.rows.map((row) => ({
    fund_id: row.fund_id,
    fund_name: row.fund_name,
    fund_type: row.fund_type,
    units_held: parseFloat(row.units_held),
    latest_nav: parseFloat(row.latest_nav),
    current_value: parseFloat((row.units_held * row.latest_nav).toFixed(2)),
  }));

  return holdings;
};

const getNetWorth = async (investor_id) => {
  const holdings = await getHoldings(investor_id);
  const totalNetWorth = holdings.reduce((sum, h) => sum + h.current_value, 0);

  return {
    investor_id: parseInt(investor_id),
    totalNetWorth: parseFloat(totalNetWorth.toFixed(2)),
    holdings,
  };
};

module.exports = { createInvestor, getAllInvestors, getInvestorById, getHoldings, getNetWorth };
