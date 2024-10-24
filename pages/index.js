// pages/index.js
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [name, setName] = useState('');
    const [ip, setIp] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/register', { name, ip });
        setName('');
        setIp('');
    };

    return (
        <div>
            <h1>Register Your Autoshop</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Autoshop Name"
                    required
                />
                <input
                    type="text"
                    value={ip}
                    onChange={(e) => setIp(e.target.value)}
                    placeholder="Your IP Address"
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
