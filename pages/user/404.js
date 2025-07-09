// pages/404.js
import Head from 'next/head';
import Link from 'next/link';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function Custom404() {
    return (

        <>
            <Head>
                <title>404 Not Found - IYF Lalmonirhat</title>
            </Head>
            <Container
                fluid
                className="d-flex align-items-center justify-content-center vh-100 bg-light"
            >
                <Row className="text-center">
                    <Col>
                        <FaExclamationTriangle size={80} className="text-warning mb-4" />
                        <h1 className="display-3 fw-bold text-danger">404</h1>
                        <h2 className="mb-3 fw-semibold text-secondary">Page Not Found</h2>
                        <p className="text-muted mb-4">
                            Oops! The page you're looking for doesn't exist or has been moved.
                        </p>
                        <Link href="/" passHref legacyBehavior>
                            <Button variant="primary" size="lg" className="px-4">
                                ⬅ Go to Homepage
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </>

    );
}
