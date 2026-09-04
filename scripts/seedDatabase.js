const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function seed() {
  const dataPath = path.join(__dirname, '../lib/mowers.json');
  const mowers = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    for (const mower of mowers) {
      const productRes = await client.query(
        `INSERT INTO products (category, name, brand, price, image_url) 
         VALUES ('Mower', $1, $2, $3, $4) RETURNING id`,
        [mower.name, mower.brand, mower.price, mower.image]
      );
      
      const productId = productRes.rows[0].id;

      await client.query(
        `INSERT INTO mower_specs (product_id, acreage, cutting_width, max_incline, boundary_wire, navigation, blade_type, removable_battery, drive_type) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          productId,
          mower.acreage,
          mower.cuttingWidth,
          mower.maxIncline,
          mower.boundaryWire,
          mower.navigation,
          mower.bladeType,
          mower.removableBattery,
          mower.driveType
        ]
      );
    }

    await client.query('COMMIT');
    console.log('Successfully seeded database with all mower metrics.');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('Seeding failed:', e);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
