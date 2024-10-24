// pages/api/register.js
import { Client } from 'pg';

export default async function handler(req, res) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    await client.connect();

    if (req.method === 'POST') {
        const { name, ip } = req.body; // Get autoshop name and IP from the request body
        try {
            await client.query('INSERT INTO autoshops (name, ip) VALUES ($1, $2)', [name, ip]);
            res.status(201).json({ message: 'Autoshop registered successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to register autoshop' });
        }
    }

    await client.end();
}
