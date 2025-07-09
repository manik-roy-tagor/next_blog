import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import BlogCard from '@/components/BlogCard';
import { ToastContainer } from 'react-toastify';
import AddPost from '@/components/AddPost';
import SponsorCard from '../../components/SponsorCard';
import Head from 'next/head';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function UserBlogsPage() {
    const router = useRouter();
    const { id } = router.query;

    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const fetchBlogs = async (newPage = 1) => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}blogs.php?user_id=${id}&page=${newPage}`);
            if (res.data.status === 'success') {
                if (newPage === 1) {
                    setBlogs(res.data.data);
                } else {
                    setBlogs(prev => [...prev, ...res.data.data]);
                }
                setHasMore(res.data.data.length === 10);
            }
        } catch (err) {
            console.error('Error loading blogs:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchUser = async () => {
        try {
            const res = await axios.get(`${API_URL}getAllUsers.php`);
            if (res.data.status === 'success') {
                const found = res.data.data.find(u => u.id == id);
                setUser(found);
            }
        } catch (err) {
            console.error('Error loading user:', err.message);
        }
    };

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) setIsLoggedIn(true);
        if (id) {
            fetchUser();
            fetchBlogs(1);
        }
    }, [id]);

    const loadMore = () => {
        const nextPage = page + 1;
        fetchBlogs(nextPage);
        setPage(nextPage);
    };

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
                <title>{user?.name || 'User'} - IYF Lalmonirhat</title>
            </Head>
            <Container fluid className="py-4" style={{ background: '#f8fafc', minHeight: '90vh' }}>
                <Row>
                    {/* Left Sidebar */}
                    <Col md={3} className="d-none d-md-block">
                        <Card className="shadow-sm border-0 mb-4 bg-white text-center">
                            <Card.Body>
                                <span className="material-icons" style={{ fontSize: 60, color: '#0d6efd' }}>
                                    account_circle
                                </span>
                                <h5 className="fw-bold mt-2">{user?.name || 'User'}</h5>
                                <p className="text-muted mb-1">Points: {user?.points ?? 0}</p>
                                <p className="text-muted">Total Posts: {blogs.length}</p>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Blog List */}
                    <Col md={6}>
                        {isLoggedIn && <AddPost />}

                        {blogs.map((blog) =>
                            blog && blog.id ? (
                                <BlogCard key={blog.id} blog={blog} onLike={handleLike} />
                            ) : null
                        )}

                        {loading && (
                            <div className="text-center mb-3">
                                <Spinner animation="border" size="sm" />
                            </div>
                        )}

                        {hasMore && !loading && (
                            <div className="text-center">
                                <Button onClick={loadMore} variant="primary">
                                    Load More
                                </Button>
                            </div>
                        )}

                        {!hasMore && blogs.length > 0 && (
                            <p className="text-center text-muted">No more blogs.</p>
                        )}
                    </Col>

                    {/* Right Sidebar */}
                    <Col md={3} className="d-none d-md-block">
                        <SponsorCard />
                    </Col>
                </Row>
                <ToastContainer />
            </Container>
        </>
    );
}
