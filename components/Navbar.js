import { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { FaBars } from 'react-icons/fa';
import LeftSidebar from './LeftSidebar';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [showSidebar, setShowSidebar] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        const user = localStorage.getItem('user');
        if (token && user) {
            setIsLoggedIn(true);
            try {
                const parsed = JSON.parse(user);
                setUsername(parsed.name || 'User');
                setUserId(parsed.id || '');
            } catch {
                setUsername('User');
            }
        } else {
            setIsLoggedIn(false);
            setUsername('');
        }
    }, [router.asPath]);

    const logout = () => {
        Cookies.remove('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        router.push('/login');
    };

    return (
        <>
            {/* Top Navbar */}
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
                <button className="btn btn-outline-light me-3 d-lg-none" onClick={() => setShowSidebar(true)}>
                    <FaBars />
                </button>

                <Link href="/" className="navbar-brand text-white">Giridhari Lal</Link>

                <div className="ms-auto d-flex align-items-center">
                    {isLoggedIn ? (
                        <div className="d-flex align-items-center">
                            <Link
                                href={`/user/${userId}`}
                                className="btn btn-outline-light me-2 d-flex align-items-center"
                            >
                                <span className="material-icons me-1" style={{ fontSize: 20 }}>account_circle</span>
                                {username}
                            </Link>
                            <button
                                onClick={logout}
                                className="btn btn-light text-dark d-none d-md-inline"
                            >
                                <span className="material-icons" style={{ fontSize: 20 }}>logout</span> Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login" className="btn btn-outline-light me-2">Login</Link>
                            <Link href="/register" className="btn btn-outline-light">Register</Link>
                        </>
                    )}
                </div>
            </nav>

            {/* Left Sidebar Component */}
            <LeftSidebar
                show={showSidebar}
                handleClose={() => setShowSidebar(false)}
                isLoggedIn={isLoggedIn}
                userId={userId}
                userName={username}
                onLogout={logout}
            />


            {/* Bottom Mobile Navbar */}
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
                <Link href="/" className="nav-link d-flex flex-column align-items-center justify-content-center" style={{ color: router.pathname === '/' ? '#007bff' : '#888' }}>
                    <span className="material-icons" style={{ fontSize: 24 }}>home</span>
                    <small>Home</small>
                </Link>
                <Link href="/topposts" className="nav-link d-flex flex-column align-items-center justify-content-center" style={{ color: router.pathname === '/topposts' ? '#007bff' : '#888' }}>
                    <span className="material-icons" style={{ fontSize: 24 }}>star</span>
                    <small>Top</small>
                </Link>
                <Link href="/users" className="nav-link d-flex flex-column align-items-center justify-content-center" style={{ color: router.pathname === '/users' ? '#007bff' : '#888' }}>
                    <span className="material-icons" style={{ fontSize: 24 }}>group</span>
                    <small>Users</small>
                </Link>
            </nav>

            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
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
