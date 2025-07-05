import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}login.php`, { phone, password });

      if (res.data.status === 'success') {
        Cookies.set('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        toast.success('Login successful!');
        router.push('/');
      } else {
        toast.error(res.data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Login error');
    }
  };

  return (
    <>
      <Head>
        <title>Login - IYF Lalmonirhat</title>
      </Head>

      <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <div className="card shadow p-4" style={{ minWidth: 350, maxWidth: 400 }}>
          <div className="text-center mb-4">
            <h3 className="mt-2 mb-0">Welcome Back</h3>
            <small className="text-muted">Sign in using your phone number</small>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input
                type="tel"
                id="phone"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>

          <div className="mt-3 text-center">
            <span className="small">
              Don't have an account?{' '}
              <Link href="/register" className="text-primary text-decoration-none">Sign up</Link>
            </span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
