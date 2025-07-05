// components/BlogCard.js
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { toast } from 'react-toastify';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export default function BlogCard({ blog, onLike }) {

  
  const handleLike = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      toast.info('Please login to like this blog.', {
        position: 'top-right',
        autoClose: 2000,
      });
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      return;
    }

    const userData = JSON.parse(user);
    const userId = userData.id;

    try {
      const res = await axios.post(`${API_URL}like.php`, {
        blog_id: blog.id,
        user_id: userId,
      });

      if (res.data.status === 'success') {
        onLike(blog.id);
        toast.success('Blog liked successfully!', {
          position: 'top-right',
          autoClose: 2000,
        });        
      } else {
        toast.error('Already Liked.', {
          position: 'top-right',
          autoClose: 2000,
        });
      }
    } catch (err) {
      console.error('Error liking the blog:', err);
      toast.error('Error while liking the blog.', {
        position: 'top-right',
        autoClose: 2000,
      });
    }
  };

  

  return (
    <Card className="shadow-sm border-0 rounded-4 mb-4">
      {blog.image && (
        <div style={{ maxHeight: 250, overflow: 'hidden', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}>
          <Card.Img variant="top" src={blog.image} style={{ objectFit: 'cover', height: 250, width: '100%' }} />
        </div>
      )}
      <Card.Body>
        <Card.Title className="fw-bold fs-4">{blog.title}</Card.Title>
        <Card.Text className="text-muted">{blog.content}</Card.Text>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex align-items-center">
            <span className="text-danger"><b>❤️</b> {blog.like_count}</span>
            <Button
              variant="outline-danger"
              size="sm"
              className="rounded-pill ms-3"
              onClick={handleLike}
            >
              Like
            </Button>
          </div>

          <Link href={`/blog/${blog.id}`} passHref>
            <Button variant="outline-primary" size="sm" className="rounded-pill px-4">
              Read More
            </Button>
          </Link>
          <span className="text-primary"><b>💬</b> {blog.comment_count}</span>

        </div>
      </Card.Body>
    </Card>
  );
}
