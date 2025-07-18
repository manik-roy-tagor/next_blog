// pages/blog/[id].js
import axios from 'axios';
import Head from 'next/head';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Link from 'next/link';
import TopPosts from '@/components/TopPosts';
import CommentsSection from '@/components/CommentsSection';
import SponsorCard from '../../components/SponsorCard';
import CategorySidebar from '../../components/CategorySidebar';


const BlogPage = ({ blog, topPosts }) => {

  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;

  return (
    <>
      <Head>
        <title>{blog?.title} - IYF Lalmonirhat Blog</title>
        <meta name="description" content={blog?.content || 'Read this blog to learn more.'} />
        <meta property="og:title" content={blog?.title} />
        <meta property="og:description" content={blog?.content} />
        <meta property="og:image" content={blog?.image || "/default-og-image.jpg"} />
      </Head>

      <Container fluid className="py-4" style={{ background: '#fff' }}>
        <Row>
          {/* Left: Categories */}
          <Col md={3} className="d-none d-md-block">
            <CategorySidebar />
          </Col>

          {/* Center: Blog Content */}
          <Col md={6}>
            <Card className="shadow-sm border-0 rounded-4">
              {blog?.image && (
                <div style={{ maxHeight: 300, overflow: 'hidden', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}>
                  <Card.Img variant="top" src={blog?.image} style={{ objectFit: 'cover', height: 300, width: '100%' }} />
                </div>
              )}
              <Card.Body>
                <Card.Title className="fw-bold fs-3 text-primary">{blog?.title}</Card.Title>
                <Card.Text style={{ fontSize: '1.1rem', color: '#334155' }}>{blog?.content}</Card.Text>
              </Card.Body>
              <CommentsSection blogId={blog.id} user={user} />

            </Card>
          </Col>

          {/* Right: Top Posts */}
          <Col md={3} className="d-none d-md-block">
            <SponsorCard />
            <TopPosts />

          </Col>
        </Row>
      </Container>
    </>
  );
};

// Server-side rendering
export async function getServerSideProps(context) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const { id } = context.params;
  let blog = null;
  let topPosts = [];

  try {
    const blogRes = await axios.get(`${API_URL}blog.php?id=${id}`);
    if (blogRes.data.status === 'success') {
      blog = blogRes.data.data;
    }

    const topRes = await axios.get(`${API_URL}top-blogs.php`);
    if (topRes.data.status === 'success') {
      topPosts = topRes.data.data;
    }
  } catch (err) {
    console.error('Error fetching blog or top posts:', err);
  }

  return { props: { blog, topPosts } };
}

export default BlogPage;
