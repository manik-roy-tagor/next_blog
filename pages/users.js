import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spinner } from 'react-bootstrap';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const res = await axios.get(`${API_URL}top-users.php`);
        if (res.data.status === 'success') {
          setUsers(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load top users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopUsers();
  }, []);

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Header className="bg-success text-white fw-bold">🏆 Top Users</Card.Header>
      <Card.Body>
        {loading ? (
          <div className="text-center"><Spinner animation="border" size="sm" /></div>
        ) : users.length > 0 ? (
          <ul className="list-unstyled mb-0">
            {users.map((user, index) => (
              <li key={user.id} className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <span className="material-icons" style={{ fontSize: '36px', color: '#007bff', marginRight: '10px' }}>
                    account_circle
                  </span>
                  <Link href={`/user/${user.id}`} className="fw-semibold text-decoration-none text-dark">
                    {user.name}
                  </Link>
                </div>
                <span className="badge bg-secondary">Posts: {user.post_count}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No users available</p>
        )}
      </Card.Body>
    </Card>
  );
}
