import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Spinner } from 'react-bootstrap';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <>
      <Navbar />

      {loading && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white"
          style={{ zIndex: 2000 }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      <div style={{ fontFamily: "'Noto Sans Bengali', 'Hind Siliguri', 'SolaimanLipi', sans-serif" }}>
        <Component {...pageProps} />
      </div>

      <Footer />
    </>
  );
}

export default MyApp;
