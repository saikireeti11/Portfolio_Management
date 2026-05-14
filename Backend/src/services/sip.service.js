const pool = require('../config/Db');

const createSip = async ({ investor_id, fund_id, portfolio_id, sip_amount, sip_date, start_date }) => {
  const investor = await pool.query('SELECT investor_id FROM investors WHERE investor_id = $1', [investor_id]);
  if (investor.rows.length === 0) {
    const err = new Error('Investor not found');
    err.status = 404;
    throw err;
  }

  const fund = await pool.query('SELECT fund_id FROM mutual_funds WHERE fund_id = $1', [fund_id]);
  if (fund.rows.length === 0) {
    const err = new Error('Mutual fund not found');
    err.status = 404;
    throw err;
  }

  const result = await pool.query(
    `INSERT INTO sips (investor_id, portfolio_id, fund_id, sip_amount, sip_date, start_date, status)
     VALUES ($1, $2, $3, $4, $5, $6, 'ACTIVE')
     RETURNING *`,
    [investor_id, portfolio_id || null, fund_id, sip_amount, sip_date, start_date]
  );
  return result.rows[0];
};

const getAllSips = async ({ page = 1, limit = 10, investor_id }) => {
  const pageNumber = parseInt(page, 10) || 1;
  const limitNumber = parseInt(limit, 10) || 10;
  const offset = (pageNumber - 1) * limitNumber;
  const params = [limitNumber, offset];
  const countParams = [];
  let whereClause = '';
  let countWhereClause = '';

  if (investor_id) {
    params.push(investor_id);
    countParams.push(investor_id);
    whereClause = `WHERE s.investor_id = $${params.length}`;
    countWhereClause = 'WHERE s.investor_id = $1';
  }

  const result = await pool.query(
    `SELECT s.*, mf.fund_name, mf.latest_nav,
            i.first_name, i.last_name, i.email AS investor_email
     FROM sips s
     JOIN mutual_funds mf ON mf.fund_id = s.fund_id
     JOIN investors i ON i.investor_id = s.investor_id
     ${whereClause}
     ORDER BY s.sip_id DESC
     LIMIT $1 OFFSET $2`,
    params
  );

  const countResult = await pool.query(
    `SELECT COUNT(*) FROM sips s ${countWhereClause}`,
    countParams
  );

  return {
    data: result.rows,
    total: parseInt(countResult.rows[0].count),
    page: pageNumber,
    limit: limitNumber,
  };
};

const getSipById = async (sip_id) => {
  const result = await pool.query(
    `SELECT s.*, mf.fund_name, mf.latest_nav, mf.category,
            i.first_name, i.last_name, i.email AS investor_email
     FROM sips s
     JOIN mutual_funds mf ON mf.fund_id = s.fund_id
     JOIN investors i ON i.investor_id = s.investor_id
     WHERE s.sip_id = $1`,
    [sip_id]
  );
  if (result.rows.length === 0) {
    const err = new Error('SIP not found');
    err.status = 404;
    throw err;
  }
  return result.rows[0];
};

// Core SIP processing with PostgreSQL transaction
const processSip = async (sip_id) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const sipResult = await client.query(
      `SELECT s.*, mf.latest_nav, mf.fund_name
       FROM sips s
       JOIN mutual_funds mf ON mf.fund_id = s.fund_id
       WHERE s.sip_id = $1 FOR UPDATE`,
      [sip_id]
    );

    if (sipResult.rows.length === 0) {
      throw Object.assign(new Error('SIP not found'), { status: 404 });
    }

    const sip = sipResult.rows[0];

    if (String(sip.status).toUpperCase() !== 'ACTIVE') {
      throw Object.assign(
        new Error(`SIP is not active. Current status: ${sip.status}`),
        { status: 400 }
      );
    }

    const investorResult = await client.query(
      'SELECT investor_id FROM investors WHERE investor_id = $1',
      [sip.investor_id]
    );
    if (investorResult.rows.length === 0) {
      throw Object.assign(new Error('Investor not found'), { status: 404 });
    }

    const nav = parseFloat(sip.latest_nav);
    if (!nav || nav <= 0) {
      throw Object.assign(new Error('Invalid NAV for fund'), { status: 400 });
    }

    const sip_amount = parseFloat(sip.sip_amount);
    const units_allocated = parseFloat((sip_amount / nav).toFixed(6));

    const txnResult = await client.query(
      `INSERT INTO investment_transactions
         (sip_id, investor_id, fund_id, nav, amount, units_allocated, transaction_date, transaction_type)
       VALUES ($1, $2, $3, $4, $5, $6, CURRENT_DATE, 'SIP')
       RETURNING *`,
      [sip_id, sip.investor_id, sip.fund_id, nav, sip_amount, units_allocated]
    );

    await client.query('COMMIT');

    return {
      message: 'SIP processed successfully',
      transaction: txnResult.rows[0],
      summary: {
        sip_id,
        fund_name: sip.fund_name,
        sip_amount,
        nav_used: nav,
        units_allocated,
      },
    };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

const getSipTransactions = async (sip_id) => {
  // Verify SIP exists
  await getSipById(sip_id);

  const result = await pool.query(
    `SELECT it.*, mf.fund_name
     FROM investment_transactions it
     JOIN mutual_funds mf ON mf.fund_id = it.fund_id
     WHERE it.sip_id = $1
     ORDER BY it.transaction_date DESC`,
    [sip_id]
  );
  return result.rows;
};

module.exports = { createSip, getAllSips, getSipById, processSip, getSipTransactions };
