// pages/api/autoshops.js
import { Client } from 'pg';

export default async function handler(req, res) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    await client.connect();

    try {
        const result = await client.query('SELECT * FROM autoshops'); // Adjust your query as needed
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch autoshops' });
    }

    await client.end();
}
