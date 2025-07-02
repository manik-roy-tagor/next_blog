import { useState } from 'react';
import { useRouter } from 'next/router';
import { loginUser } from '../lib/api';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser({ email, password });
      if (result?.token) {
      Cookies.set('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      toast.success('Login successful!', { position: 'top-right' });
      router.push('/');
      } else {
      toast.error(result?.msg || 'Login failed', { position: 'top-right' });
      }
    } catch {
      toast.error('Login error', { position: 'top-right' });
    }
  };

return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <div className="card shadow p-4" style={{ minWidth: 350, maxWidth: 400, width: '100%' }}>
            <div className="text-center mb-4">
                <h3 className="mt-2 mb-0">Welcome Back</h3>
                <small className="text-muted">Sign in to your account</small>
            </div>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        id="email"
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoFocus
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        id="password"
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            <div className="mt-3 text-center">
                <a href="/forgot-password" className="small text-decoration-none">Forgot password?</a>
            </div>
            <div className="mt-2 text-center">
                <span className="small">Don't have an account? <Link href="/register" className="text-primary text-decoration-none">Sign up</Link></span>
            </div>
        </div>
    </div>
);
}
