import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import Link from 'next/link';

export default function TopUserList() {
    const [users, setUsers] = useState([]);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Fetch users with the most posts from the new API
                const res = await axios.get(`${API_URL}top-users.php`);
                if (res.data.status === 'success') {
                    console.log('Fetched users:', res.data.data); // Debug log
                    setUsers(res.data.data);
                } else {
                    console.error('Failed to load users:', res.data.message);
                }
            } catch (err) {
                console.error('Error loading users', err.message);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div style={{ position: 'fixed', top: '80px', width: '25%', right: 0, height: '75vh', overflowY: 'auto', paddingLeft: '15px' }}>
            <Card className="shadow-sm border-0" style={{ background: '#fff' }}>
                <Card.Header className="bg-success text-white fw-bold">Top Users</Card.Header>
                <Card.Body>
                    <ul className="list-unstyled mb-0">
                        {users.length > 0 ? (
                            users.map(user => (
                                <li key={user.id} className="d-flex align-items-center mb-3">
                                    <span
                                        className="material-icons"
                                        style={{
                                            fontSize: '40px',
                                            marginRight: '10px',
                                            color: '#007bff'
                                        }}
                                    >
                                        account_circle
                                    </span>
                                    <span className="fw-semibold">
                                        <Link href={`/user/${user.id}`}>
                                            {user.name} - ({user.post_count})
                                        </Link>
                                    </span>
                                </li>
                            ))
                        ) : (
                            <li>No users available</li>
                        )}
                    </ul>
                </Card.Body>
            </Card>
        </div>
    );
}
