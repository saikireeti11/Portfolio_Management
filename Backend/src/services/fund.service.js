const pool = require('../config/Db');

const createFund = async ({ amc_id, fund_name, fund_type, category, latest_nav }) => {
  // Verify AMC exists
  const amc = await pool.query('SELECT amc_id FROM amcs WHERE amc_id = $1', [amc_id]);
  if (amc.rows.length === 0) {
    const err = new Error('AMC not found');
    err.status = 404;
    throw err;
  }

  const result = await pool.query(
    `INSERT INTO mutual_funds (amc_id, fund_name, fund_type, category, latest_nav, updated_at)
     VALUES ($1, $2, $3, $4, $5, NOW())
     RETURNING *`,
    [amc_id, fund_name, fund_type || null, category || null, latest_nav]
  );
  return result.rows[0];
};

const getAllFunds = async ({ page = 1, limit = 10, category }) => {
  const pageNumber = parseInt(page, 10) || 1;
  const limitNumber = parseInt(limit, 10) || 10;
  const offset = (pageNumber - 1) * limitNumber;
  const params = [limitNumber, offset];
  const countParams = [];
  let whereClause = '';
  let countWhereClause = '';

  if (category) {
    params.push(`%${category}%`);
    countParams.push(`%${category}%`);
    whereClause = `WHERE mf.category ILIKE $${params.length}`;
    countWhereClause = 'WHERE mf.category ILIKE $1';
  }

  const result = await pool.query(
    `SELECT mf.*, a.amc_name, a.amc_code
     FROM mutual_funds mf
     JOIN amcs a ON a.amc_id = mf.amc_id
     ${whereClause}
     ORDER BY mf.fund_id DESC
     LIMIT $1 OFFSET $2`,
    params
  );

  const countResult = await pool.query(
    `SELECT COUNT(*) FROM mutual_funds mf ${countWhereClause}`,
    countParams
  );

  return {
    data: result.rows,
    total: parseInt(countResult.rows[0].count),
    page: pageNumber,
    limit: limitNumber,
  };
};

const getFundById = async (fund_id) => {
  const result = await pool.query(
    `SELECT mf.*, a.amc_name, a.amc_code
     FROM mutual_funds mf
     JOIN amcs a ON a.amc_id = mf.amc_id
     WHERE mf.fund_id = $1`,
    [fund_id]
  );
  if (result.rows.length === 0) {
    const err = new Error('Mutual fund not found');
    err.status = 404;
    throw err;
  }
  return result.rows[0];
};

const updateNav = async (fund_id, latest_nav) => {
  const result = await pool.query(
    `UPDATE mutual_funds SET latest_nav = $1, updated_at = NOW()
     WHERE fund_id = $2 RETURNING *`,
    [latest_nav, fund_id]
  );
  if (result.rows.length === 0) {
    const err = new Error('Mutual fund not found');
    err.status = 404;
    throw err;
  }
  return result.rows[0];
};

module.exports = { createFund, getAllFunds, getFundById, updateNav };
