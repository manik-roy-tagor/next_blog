import { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';


export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [userid, setUserid] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        const user = localStorage.getItem('user');
        if (token && user) {
            setIsLoggedIn(true);
            try {
                const parsed = JSON.parse(user);
                setUsername(parsed.name || 'User');
                setUserid(parsed.id || '');
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
            {/* Header Navbar */}
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
                    Giridhari Lal
                </Link>
                <div className="ms-auto d-flex align-items-center">
                    {isLoggedIn ? (
                        <div
                            className="d-flex justify-content-between align-items-center"
                            style={{ flexDirection: 'row' }} // Ensures buttons are aligned in a row
                        >
                            {/* User Profile Button */}
                            <Link href={`/user/${userid}`}
                                className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
                                type="button"
                                id="userMenu"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ marginRight: '8px', padding: '8px 16px' }} // Space between the profile button and logout
                            >
                                <span className="material-icons me-1" style={{ fontSize: 20 }}>account_circle</span>
                                {username}
                            </Link>

                            {/* Logout Button */}
                            <button
                                onClick={logout}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '8px 16px',
                                    backgroundColor: '#fff',
                                    border: '1px solid #fff',
                                    borderRadius: '4px',
                                    color: '#333',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    gap: '8px',
                                }}
                                className="d-none d-md-flex"  // Hide on small devices, show on medium and above
                            >
                                <span className="material-icons" style={{ fontSize: 20 }}>logout</span>
                                Logout
                            </button>


                        </div>
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

            {/* Footer Navbar (Mobile) */}
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
                    <small>Top Posts</small>
                </Link>
                <Link href="/users" className="nav-link d-flex flex-column align-items-center justify-content-center" style={{ color: router.pathname === '/users' ? '#007bff' : '#888' }}>
                    <span className="material-icons" style={{ fontSize: 24 }}>menu_book</span>
                    <small>Users</small>
                </Link>
                {isLoggedIn ? (
                    <button
                        className="nav-link d-flex flex-column align-items-center justify-content-center btn btn-link p-0"
                        style={{ color: '#888' }}
                        onClick={logout}
                    >
                        <span className="material-icons" style={{ fontSize: 24 }}>logout</span>
                        <small>Logout</small>
                    </button>
                ) : (
                    <Link href="/login" className="nav-link d-flex flex-column align-items-center justify-content-center" style={{ color: '#888' }}>
                        <span className="material-icons" style={{ fontSize: 24 }}>login</span>
                        <small>Login</small>
                    </Link>
                )}
            </nav>


            {/* Material Icons + Bootstrap Dropdown */}
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
