import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MyApp({ Component, pageProps }) {
return (
    <>
        <Navbar />
        <div style={{ fontFamily: "'Noto Sans Bengali', 'SolaimanLipi', 'Bangla', sans-serif" }}>
            <Component {...pageProps} />
        </div>
        <Footer />
        
    </>
);
}

export default MyApp;
