require('dotenv').config({ quiet: true });
const bcrypt = require('bcryptjs');
const pool = require('./src/config/Db');

const seed = async () => {
  const client = await pool.connect();
  try {
    console.log('Starting seed...');
    await client.query('BEGIN');

    // ── Users ──────────────────────────────────────────────
    const hashedPw = await bcrypt.hash('password123', 10);
    await client.query(`
      INSERT INTO users (name, email, password) VALUES
        ('Admin User',   'admin@siptracker.com',  '${hashedPw}'),
        ('Rohan Mehta',  'rohan@example.com',     '${hashedPw}'),
        ('Priya Sharma', 'priya@example.com',     '${hashedPw}')
      ON CONFLICT (email) DO NOTHING
    `);
    console.log('✓ Users seeded');

    // ── AMCs ───────────────────────────────────────────────
    await client.query(`
      INSERT INTO amcs (amc_name, amc_code) VALUES
        ('Axis Asset Management',        'AXIS'),
        ('SBI Funds Management',         'SBI'),
        ('HDFC Asset Management',        'HDFC'),
        ('Mirae Asset Investment',       'MIRAE'),
        ('Nippon India Mutual Fund',     'NIPPON')
      ON CONFLICT (amc_code) DO NOTHING
    `);
    console.log('✓ AMCs seeded');

    // ── Mutual Funds ───────────────────────────────────────
    const amcs = await client.query('SELECT amc_id, amc_code FROM amcs');
    const amcMap = {};
    amcs.rows.forEach(a => { amcMap[a.amc_code] = a.amc_id; });

    await client.query(`
      INSERT INTO mutual_funds (amc_id, fund_name, fund_type, category, latest_nav, updated_at) VALUES
        (${amcMap['AXIS']},   'Axis Bluechip Fund',                  'Open Ended', 'Equity',       45.6700, NOW()),
        (${amcMap['AXIS']},   'Axis Small Cap Fund',                 'Open Ended', 'Equity',       78.3200, NOW()),
        (${amcMap['SBI']},    'SBI Magnum Gilt Fund',                'Open Ended', 'Debt',         52.1400, NOW()),
        (${amcMap['SBI']},    'SBI Blue Chip Fund',                  'Open Ended', 'Equity',       67.8900, NOW()),
        (${amcMap['HDFC']},   'HDFC Mid-Cap Opportunities Fund',     'Open Ended', 'Equity',      120.5600, NOW()),
        (${amcMap['HDFC']},   'HDFC Short Term Debt Fund',           'Open Ended', 'Debt',         25.4300, NOW()),
        (${amcMap['MIRAE']},  'Mirae Asset Large Cap Fund',          'Open Ended', 'Equity',       88.2100, NOW()),
        (${amcMap['NIPPON']}, 'Nippon India Index Fund - Nifty 50',  'Open Ended', 'Index',        22.7800, NOW())
    `);
    console.log('✓ Mutual funds seeded');

    // ── Investors ──────────────────────────────────────────
    await client.query(`
      INSERT INTO investors (first_name, last_name, email, phone, pan_number) VALUES
        ('Rohan',   'Mehta',   'rohan.investor@example.com',  '9876543210', 'ABCPM1234R'),
        ('Priya',   'Sharma',  'priya.investor@example.com',  '9123456780', 'BCDPS5678Q'),
        ('Amit',    'Verma',   'amit.investor@example.com',   '9988776655', 'CDEAV9012S'),
        ('Sneha',   'Patel',   'sneha.investor@example.com',  '9001122334', 'DEFSP3456T')
      ON CONFLICT (email) DO NOTHING
    `);
    console.log('✓ Investors seeded');

    // ── Portfolios ─────────────────────────────────────────
    const investors = await client.query('SELECT investor_id FROM investors ORDER BY investor_id');
    for (const inv of investors.rows) {
      await client.query(`
        INSERT INTO portfolios (investor_id, portfolio_name)
        VALUES ($1, 'Default Portfolio')
        ON CONFLICT DO NOTHING
      `, [inv.investor_id]);
    }
    console.log('✓ Portfolios seeded');

    // ── SIPs ───────────────────────────────────────────────
    const funds = await client.query('SELECT fund_id FROM mutual_funds ORDER BY fund_id');
    const portfolios = await client.query('SELECT portfolio_id, investor_id FROM portfolios ORDER BY portfolio_id');

    const portMap = {};
    portfolios.rows.forEach(p => { portMap[p.investor_id] = p.portfolio_id; });

    const inv = investors.rows;
    const fn = funds.rows;

    const sips = [
      [inv[0].investor_id, portMap[inv[0].investor_id], fn[0].fund_id, 5000,  5, '2024-01-05'],
      [inv[0].investor_id, portMap[inv[0].investor_id], fn[4].fund_id, 3000, 10, '2024-01-10'],
      [inv[1].investor_id, portMap[inv[1].investor_id], fn[1].fund_id, 2000,  7, '2024-01-07'],
      [inv[1].investor_id, portMap[inv[1].investor_id], fn[6].fund_id, 4000, 15, '2024-01-15'],
      [inv[2].investor_id, portMap[inv[2].investor_id], fn[2].fund_id, 1500, 20, '2024-02-01'],
      [inv[3].investor_id, portMap[inv[3].investor_id], fn[7].fund_id, 2500,  1, '2024-02-01'],
    ];

    for (const s of sips) {
      await client.query(`
        INSERT INTO sips (investor_id, portfolio_id, fund_id, sip_amount, sip_date, start_date, status)
        VALUES ($1, $2, $3, $4, $5, $6, 'ACTIVE')
      `, s);
    }
    console.log('✓ SIPs seeded');

    // ── Investment Transactions (historical) ───────────────
    const sipRows = await client.query('SELECT s.sip_id, s.investor_id, s.fund_id, s.sip_amount, mf.latest_nav FROM sips s JOIN mutual_funds mf ON mf.fund_id = s.fund_id');

    for (const sip of sipRows.rows) {
      // Insert 3 months of historical transactions per SIP
      for (let i = 3; i >= 1; i--) {
        const nav = parseFloat(sip.latest_nav) * (0.92 + Math.random() * 0.1);
        const units = parseFloat((sip.sip_amount / nav).toFixed(6));
        const txDate = new Date();
        txDate.setMonth(txDate.getMonth() - i);

        await client.query(`
          INSERT INTO investment_transactions
            (sip_id, investor_id, fund_id, nav, amount, units_allocated, transaction_date, transaction_type)
          VALUES ($1, $2, $3, $4, $5, $6, $7, 'SIP')
        `, [sip.sip_id, sip.investor_id, sip.fund_id, nav.toFixed(4), sip.sip_amount, units, txDate.toISOString().split('T')[0]]);
      }
    }
    console.log('✓ Investment transactions seeded');

    await client.query('COMMIT');
    console.log('\n✅ Seed completed successfully!');
    console.log('──────────────────────────────');
    console.log('Test login → admin@siptracker.com / password123');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Seed failed:', err.message);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
};

seed();
