// pages/index.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogCard from '@/components/BlogCard';
import TopUserList from '@/components/TopUserList';
import AddPost from '@/components/AddPost';
import SponsorCard from '../components/SponsorCard';
import CategorySidebar from '../components/CategorySidebar';



const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loadBlogs = async () => {
    try {
      const res = await axios.get(`${API_URL}blogs.php?page=${page}`);
      if (res.data.status === 'success' && Array.isArray(res.data.data)) {
        const newBlogs = res.data.data.filter(blog => blog && blog.id);
        setBlogs(prev => [...prev, ...newBlogs]);
        setHasMore(newBlogs.length > 0);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error loading blogs:', err);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) setIsLoggedIn(true);
    if (isClient) loadBlogs();
  }, [page, isClient]);

  const handleLike = (blogId) => {
    setBlogs(prev =>
      prev.map(blog =>
        blog.id === blogId ? { ...blog, like_count: blog.like_count + 1 } : blog
      )
    );
  };

  return (
    <>
      <Head>
        <title>IYF Lalmonirhat - Youth Blog & Community</title>
        <meta charset="UTF-8"></meta>
        <meta name="description" content="Explore blogs from youth of Lalmonirhat. Stay updated with ideas, stories, opinions, and news." />
        <meta name="keywords" content="blog, youth, IYFL, Lalmonirhat, community, stories, education" />
        <meta name="author" content="IYFL Lalmonirhat" />
        <meta property="og:title" content="IYFL Lalmonirhat Blog" />
        <meta property="og:description" content="A platform to read and share inspiring youth stories from Lalmonirhat." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://localhost:2000/" />
        <meta property="og:image" content="/default-og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="IYFL Lalmonirhat Blog" />
        <meta name="twitter:description" content="Read and share inspiring youth stories from Lalmonirhat." />
        <meta name="twitter:image" content="/default-og-image.jpg" />
      </Head>

      <Container fluid className="py-4" style={{ marginTop: '0px', background: '#f8fafc', minHeight: '75vh', overflow: 'hidden' }}>
        <Row>
          <Col md={3} className="mb-4 d-none d-md-block">
            <div style={{ position: 'fixed', top: '80px', left: 0, width: '23%', height: '80vh', overflowY: 'auto', paddingRight: '15px' }}>
              <CategorySidebar />
            </div>
          </Col>

          <Col xs={12} md={6} className="mx-auto">
            <div style={{ minHeight: '60vh', paddingRight: '10px' }}>
              {isLoggedIn && <AddPost />}

              {Array.isArray(blogs) && blogs.length > 0 ? (
                blogs.map((blog) =>
                  blog && blog.id ? (
                    <BlogCard key={blog.id} blog={blog} onLike={handleLike} />
                  ) : null
                )
              ) : (
                <p className="text-center text-muted">No blogs found.</p>
              )}

              {hasMore ? (
                <div className="text-center my-4">
                  <Button variant="primary" onClick={() => setPage((prev) => prev + 1)} disabled={!hasMore}>
                    Load More
                  </Button>
                </div>
              ) : (
                <p className="text-center text-muted">No more blogs.</p>
              )}
            </div>
          </Col>

          <Col md={3} className="mb-4 d-none d-md-block">
            <TopUserList />
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
}
