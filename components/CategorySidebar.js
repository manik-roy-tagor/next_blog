// components/CategorySidebar.js
import { Card } from 'react-bootstrap';

export default function CategorySidebar() {
  return (
    <div style={{ position: 'fixed', top: '80px', left: 0, width: '23%', height: '80vh', overflowY: 'auto', paddingRight: '15px' }}>
      <Card className="shadow-sm border-0" style={{ background: '#fff' }}>
        <Card.Header className="bg-primary text-white fw-bold">Categories</Card.Header>
        <Card.Body>
          <ul className="list-unstyled mb-0">
            {['Technology', 'Lifestyle', 'Travel', 'Education', 'Health', 'test'].map(cat => (
              <li key={cat} className="mb-2">
                <a href="#" className="text-decoration-none text-dark d-flex align-items-center">
                  <span className="me-2">📁</span> {cat}
                </a>
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
}
