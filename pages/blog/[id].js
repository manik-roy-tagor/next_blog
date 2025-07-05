// pages/blog/[id].js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import Link from 'next/link';

const BlogPage = ({ blog }) => {
    return (
        <>
            <Head>
                <title>{blog?.title} - IYFL Almonirhat Blog</title>
                <meta name="description" content={blog?.content || 'Read this blog to learn more.'} />
                <meta property="og:title" content={blog?.title} />
                <meta property="og:description" content={blog?.content} />
                <meta property="og:image" content={blog?.image || "/default-og-image.jpg"} />
            </Head>
            <Container fluid className="py-4">
                <Row>
                    <Col xs={12}>
                        <Card className="shadow-sm border-0 rounded-4">
                            {blog?.image && (
                                <Card.Img variant="top" src={blog?.image} style={{ height: 250, width: '100%' }} />
                            )}
                            <Card.Body>
                                <Card.Title className="fw-bold fs-4">{blog?.title}</Card.Title>
                                <Card.Text>{blog?.content}</Card.Text>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <style jsx>{`
                /* Custom styles for gap adjustment */
                @media (max-width: 767.98px) {
                    .blog-container {
                        padding-left: 0 !important;
                        padding-right: 0 !important;
                    }
                }
                @media (min-width: 768px) {
                    .blog-container {
                        padding-left: 30px !important;
                        padding-right: 30px !important;
                    }
                }
            `}</style>
        </>
    );
};

// Fetching blog details on server-side rendering
export async function getServerSideProps(context) {
    const { id } = context.params;
    const res = await axios.get(`http://localhost/iyflalmonirhat-api/api/blog.php?id=${id}`);
    const blog = res.data.status === 'success' ? res.data.data : null;

    return { props: { blog } };
}

export default BlogPage;
