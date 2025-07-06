// components/CategorySidebar.js
import { useEffect, useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { MdCategory } from 'react-icons/md'; // স্মার্ট ক্যাটাগরি আইকন


const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log('API URL:', API_URL);

export default function CategorySidebar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}get-categories.php`);
      console.log('Fetched Categories:', res.data);
      if (res.data.status === 'success') {
        setCategories(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err.message);
    }
  };

  fetchCategories();
}, []);


  return (
    <div
      style={{
        position: 'fixed',
        top: '80px',
        left: 0,
        width: '23%',
        height: '80vh',
        overflowY: 'auto',
        paddingRight: '15px'
      }}
    >
      <Card className="shadow-sm border-0" style={{ background: '#fff' }}>
        <Card.Header className="bg-primary text-white fw-bold">Categories</Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" size="sm" />
            </div>
          ) : categories.length > 0 ? (
            <ul className="list-unstyled mb-0">
              {categories.map((cat) => (
                <li key={cat.id} className="mb-2">
                  <a
                    href="#"
                    className="text-decoration-none text-dark d-flex align-items-center"
                  >
                    <span className="me-2 text-primary"><MdCategory size={18} /></span> {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No categories found.</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
