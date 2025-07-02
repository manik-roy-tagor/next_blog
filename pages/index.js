import { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Card, Button, Modal, Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// API URL
const API_URL = 'https://developertagor.xyz/iyf_lal_api/api/';

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isClient, setIsClient] = useState(false);  // Added for client-side check

  // Load blogs
  const loadBlogs = async () => {
    try {
      const res = await axios.get(`${API_URL}blogs.php?page=${page}`);
      if (res.data.status === 'success') {
        const newBlogs = res.data.data;
        setBlogs(prev => [...prev, ...newBlogs]);
        setHasMore(newBlogs.length > 0);
      }
    } catch (err) {
      console.error('Error loading blogs:', err);
    }
  };

  useEffect(() => {
    // Ensure this is only running on the client-side
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      loadBlogs();
    }
  }, [page, isClient]);

  // Show blog modal
  const openModal = async (blogId) => {
    try {
      const res = await axios.get(`${API_URL}blog.php?id=${blogId}`);
      if (res.data.status === 'success') {
        setSelectedBlog(res.data.data);
        setShowModal(true);
      }
    } catch (err) {
      console.error('Error loading blog details:', err);
    }
  };

  // Handle Like button click
  const handleLike = async (blogId) => {
    const user = localStorage.getItem('user'); // Assuming user is stored in localStorage
    if (!user) {
      // Show toast and redirect to login page
      toast.info('Please login to like this blog.', {
        position: 'top-right',
        autoClose: 3000,
      });
      setTimeout(() => {
        window.location.href = '/login'; // Redirect to login page
      }, 3000);
      return;
    }

    const userData = JSON.parse(user); // Parse user data
    const userId = userData.id; // Get the logged-in user ID

    try {
      // API call to like the blog
      const res = await axios.post(`${API_URL}like.php`, {
        blog_id: blogId,
        user_id: userId,
      });

      if (res.data.status === 'success') {
        // Update the like count locally after successful like
        setBlogs(blogs.map(blog =>
          blog.id === blogId ? { ...blog, like_count: blog.like_count + 1 } : blog
        ));
        toast.success('Blog liked successfully!', {
          position: 'top-right',
          autoClose: 2000,
        });
      } else {
        toast.error('Failed to add like.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error('Error liking the blog:', err);
      toast.error('Error while liking the blog.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  if (!isClient) {
    return null;  // Return nothing until it's fully loaded on the client
  }

  return (
    <Container fluid className="py-4" style={{ marginTop: '0px', background: '#f8fafc', minHeight: '75vh', overflow: 'hidden' }}>
      <Row>

        <Col md={3} className="mb-4 d-none d-md-block">
          <div style={{ position: 'fixed', top: '80px', left: 0, width: '23%', height: '80vh', overflowY: 'auto', paddingRight: '15px' }}>
            <Card className="shadow-sm border-0" style={{ background: '#fff' }}>
              <Card.Header className="bg-primary text-white fw-bold">Categories</Card.Header>
              <Card.Body>
                <ul className="list-unstyled mb-0">
                  {['Technology', 'Lifestyle', 'Travel', 'Education', 'Health'].map(cat => (
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
        </Col>

        <Col xs={12} md={7} className="mx-auto">
          <div
            style={{
              minHeight: '60vh',
              paddingRight: '10px',
            }}
          >
            <style jsx global>{`
                body, html {
                  overflow-x: hidden !important;
                }
                footer {
                  overflow: hidden !important;
                }
              `}</style>
            {blogs.map(blog => (
              <Row key={blog.id} className="justify-content-center mb-4">
                <Col md={12}>
                  <Card className="shadow-sm border-0 rounded-4">
                    {blog.image && (
                      <div style={{ maxHeight: 250, overflow: 'hidden', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}>
                        <Card.Img variant="top" src={blog.image} style={{ objectFit: 'cover', height: 250, width: '100%' }} />
                      </div>
                    )}
                    <Card.Body>
                      <Card.Title className="fw-bold fs-4">{blog.title}</Card.Title>
                      <Card.Text className="text-muted">{blog.excerpt}</Card.Text>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-danger"><b>❤️</b> {blog.like_count}</span>
                        <span className="text-primary"><b>💬</b> {blog.comment_count}</span>
                      </div>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="rounded-pill px-4"
                        onClick={() => openModal(blog.id)}
                      >
                        Read More
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="rounded-pill ms-3"
                        onClick={() => handleLike(blog.id)}
                      >
                        Like
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            ))}
            {hasMore ? (
              <div className="text-center my-4">
                <Button
                  variant="primary"
                  onClick={() => setPage(prev => prev + 1)}
                  disabled={!hasMore}
                >
                  Load More
                </Button>
              </div>
            ) : (
              <p className="text-center text-muted">No more blogs.</p>
            )}
          </div>
        </Col>

        {/* Right Sidebar: Users */}
        <Col md={2} className="mb-4 d-none d-md-block">
          <div style={{ position: 'fixed', top: '80px', right: 0, width: '16.6667%', height: '75vh', overflowY: 'auto', paddingLeft: '15px' }}>
            <Card className="shadow-sm border-0" style={{ background: '#fff' }}>
              <Card.Header className="bg-success text-white fw-bold">Top Users</Card.Header>
              <Card.Body>
                <ul className="list-unstyled mb-0">
                  {['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'].map(user => (
                    <li key={user} className="mb-2">
                      <span className="me-2">👤</span>
                      <span className="fw-semibold">{user}</span>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>

      {/* Blog Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>{selectedBlog?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBlog?.image && (
            <img src={selectedBlog.image} alt="blog" className="img-fluid mb-3 rounded-3" style={{ maxHeight: 350, objectFit: 'cover', width: '100%' }} />
          )}
          <p style={{ fontSize: '1.1rem', color: '#334155' }}>{selectedBlog?.content}</p>
          <hr />
          <h5 className="mb-3 text-primary">💬 Comments:</h5>
          {selectedBlog?.comments?.length ? (
            selectedBlog.comments.map(comment => (
              <div key={comment.id} className="mb-3">
                <strong className="text-success">{comment.user || 'User'}:</strong> {comment.text}
                <div className="ps-3">
                  {comment.replies?.map(reply => (
                    <div key={reply.id} className="text-secondary">
                      ↪ <strong>{reply.user || 'User'}:</strong> {reply.text}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-muted">No comments yet.</div>
          )}
        </Modal.Body>
      </Modal>

      {/* Toast Notifications */}
      <ToastContainer />
    </Container>
  );
}
