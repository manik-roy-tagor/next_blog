// components/CategorySidebar.js
import { useEffect, useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { MdCategory } from 'react-icons/md'; // Smart category icon
import Link from 'next/link';
import Head from 'next/head';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CategorySidebar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}get-categories.php`);
        if (res.data.status === 'success') {
          setCategories(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
       
    <div
      style={{
        position: 'fixed',
        top: '80px',
        left: 0,
        width: '23%',
        height: '80vh',
        overflowY: 'auto',
        paddingRight: '15px',
        zIndex: 1000,
      }}
    >
      <Card className="shadow-sm border-0 bg-white">
        <Card.Header className="bg-primary text-white fw-bold">
          <MdCategory className="me-2" /> Categories
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center py-3">
              <Spinner animation="border" size="sm" />
            </div>
          ) : categories.length > 0 ? (
            <ul className="list-unstyled mb-0">
              {categories.map((cat) => (
                <li key={cat.id} className="mb-2">
                  <Link
                    href={`/category/${cat.id}`}
                    className="text-decoration-none text-dark d-flex align-items-center"
                  >
                    <MdCategory size={18} className="me-2 text-primary" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No categories found.</p>
          )}
        </Card.Body>
      </Card>
    </div>
    </>
  );
}
