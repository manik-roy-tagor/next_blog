import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import Link from 'next/link';

export default function TopUserList() {
    const [users, setUsers] = useState([]);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const currentUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
        const currentUserId = currentUser ? JSON.parse(currentUser).id : null;

        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${API_URL}getAllUsers.php`);
                if (res.data.status === 'success') {
                    const filtered = res.data.data.filter(u => parseInt(u.id) !== parseInt(currentUserId));
                    setUsers(filtered);
                }
            } catch (err) {
                console.error('Error loading users', err.message);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div style={{ position: 'fixed', top: '80px', right: 0, width: '16.6667%', height: '75vh', overflowY: 'auto', paddingLeft: '15px' }}>
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
                                    <span className="fw-semibold"><Link href={`/user/${user.id}`}>{user.name}</Link></span>
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
