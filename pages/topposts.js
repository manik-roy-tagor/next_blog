// components/TopPosts.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spinner } from 'react-bootstrap';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TopPosts() {
  const [topPosts, setTopPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopPosts = async () => {
      try {
        const res = await axios.get(`${API_URL}top-blogs.php`);
        if (res.data.status === 'success') {
          setTopPosts(res.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch top posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopPosts();
  }, []);

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Header className="bg-warning text-dark fw-bold">🔥 Top Posts</Card.Header>
      <Card.Body>
        {loading ? (
          <div className="text-center"><Spinner animation="border" size="sm" /></div>
        ) : topPosts.length > 0 ? (
          <ul className="list-unstyled mb-0">
            {topPosts.map((post) => (
              <li key={post.id} className="mb-3">
                <Link href={`/blog/${post.id}`} className="text-decoration-none text-dark">
                  <div className="d-flex align-items-start">
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 6, marginRight: 10 }}
                      />
                    )}
                    <div>
                      <div className="fw-semibold">{post.title}</div>
                      <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                        ❤️ {post.like_count} | 💬 {post.comment_count}
                      </div>
                    </div>
                  </div>
                </Link>
                <hr/>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No top posts found.</p>
        )}
      </Card.Body>
    </Card>
  );
}
