import { useState } from 'react';
import { useRouter } from 'next/router';
import { registerUser } from '../lib/api';
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const result = await registerUser({ name, email, password });
            if (result?.status === 'success') {
                toast.success('Registered successfully', { position: 'top-right' });
                router.push('/login');
            } else {
                toast.error(result?.message || 'Registration failed', { position: 'top-right' });
            }
        } catch (err) {
            console.log("Registration error:", err);
            toast.error('Registration error', { position: 'top-right' });
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card shadow p-4" style={{ maxWidth: 400, width: '100%' }}>
                <h2 className="mb-4 text-center text-primary">Create Account</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
                <div className="text-center mt-3">
                    <small>
                        Already have an account?{' '}
                        <Link href="/login" className="text-decoration-none">Login</Link>
                    </small>
                </div>
            </div>
        </div>
    );
}
