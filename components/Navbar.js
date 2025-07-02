import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function Navbar() {
    const token = Cookies.get('token');
    const router = useRouter();

    const logout = () => {
        Cookies.remove('token');
        router.push('/login');
    };

    // Responsive Navbar/Footer
    return (
        <>
            {/* Header Navbar for all devices */}
            <nav
                className="navbar navbar-expand-lg px-3"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    backgroundColor: '#007bff',
                    zIndex: 1000,
                }}
            >
                <Link href="/" className="navbar-brand text-white">
                    MyApp
                </Link>
                <div className="ms-auto">
                    {token ? (
                        <>
                            <Link href="/messenger" className="btn btn-outline-light me-2">
                                Messenger
                            </Link>
                            <button className="btn btn-outline-light" onClick={logout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="btn btn-outline-light me-2">
                                Login
                            </Link>
                            <Link href="/register" className="btn btn-outline-light">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            {/* Footer Navbar for small devices (Android-style with icons) */}
            <nav
                className="navbar navbar-expand d-flex d-md-none justify-content-around align-items-center"
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    backgroundColor: '#fff',
                    borderTop: '1px solid #ddd',
                    zIndex: 1000,
                    padding: '0.3rem 0',
                    boxShadow: '0 -2px 8px rgba(0,0,0,0.05)'
                }}
            >
                <Link href="/" className="nav-link text-center" style={{ color: router.pathname === '/' ? '#007bff' : '#888' }}>
                    <span className="material-icons" style={{ fontSize: 24, display: 'block' }}>home</span>
                    <small style={{ fontSize: 12 }}>Home</small>
                </Link>
                <Link href="/" className="nav-link text-center" style={{ color: router.pathname === '/' ? '#007bff' : '#888' }}>
                    <span className="material-icons" style={{ fontSize: 24, display: 'block' }}>category</span>
                    <small style={{ fontSize: 12 }}>Category</small>
                </Link>
                <Link href="/" className="nav-link text-center" style={{ color: router.pathname === '/' ? '#007bff' : '#888' }}>
                    <span className="material-icons" style={{ fontSize: 24, display: 'block' }}>menu_book</span>
                    <small style={{ fontSize: 12 }}>Books</small>
                </Link>
                <Link href="/messenger" className="nav-link text-center" style={{ color: router.pathname === '/messenger' ? '#007bff' : '#888' }}>
                    <span className="material-icons" style={{ fontSize: 24, display: 'block' }}>chat</span>
                    <small style={{ fontSize: 12 }}>Messenger</small>
                </Link>
                {token ? (
                    <button
                        className="nav-link text-center btn btn-link p-0"
                        style={{ color: '#888' }}
                        onClick={logout}
                    >
                        <span className="material-icons" style={{ fontSize: 24, display: 'block' }}>logout</span>
                        <small style={{ fontSize: 12 }}>Logout</small>
                    </button>
                ) : (
                    <Link href="/login" className="nav-link text-center" style={{ color: router.pathname === '/login' ? '#007bff' : '#888' }}>
                        <span className="material-icons" style={{ fontSize: 24, display: 'block' }}>login</span>
                        <small style={{ fontSize: 12 }}>Login</small>
                    </Link>
                )}
            </nav>
            {/* Google Material Icons CDN */}
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            {/* Add margin to content to avoid overlap */}
            <style jsx global>{`
                body {
                    padding-top: 56px;
                }
                @media (max-width: 767.98px) {
                    body {
                        padding-bottom: 56px;
                    }
                }
            `}</style>
        </>
    );
}
