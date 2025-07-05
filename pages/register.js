import { useState } from 'react';
import { Form, Button, Card, Spinner, Container } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Link from 'next/link';
import Head from 'next/head';

export default function PhoneOtpRegister() {
    const [step, setStep] = useState(1); // 1: Phone, 2: OTP, 3: Name & Password
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [serverOtp, setServerOtp] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;


    // ✅ Step 1: Send OTP
    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);

        // ✅ Validate phone number format (Bangladesh, 11 digits, starts with 01)
        if (!/^01[0-9]{9}$/.test(phone)) {
            toast.error('Invalid phone number.');
            setLoading(false);
            return;
        }

        try {
            // ✅ Check if phone already registered
            const checkRes = await axios.post(`${API_URL}checkPhone.php`, { phone });

            if (checkRes.data.status === 'exists') {
                toast.error('❌ Already registered.');
                setLoading(false);
                return;
            }

            // ✅ Generate & send OTP
            const generatedOtp = Math.floor(100000 + Math.random() * 900000);
            setServerOtp(generatedOtp.toString());

            const smsBody = `Your IYFLalmonirhat OTP code is: ${generatedOtp}`;

            await axios.get(`https://bulksmsbd.net/api/smsapi`, {
                params: {
                    api_key: '2obqErpvnVk6lk9NwyNO',
                    senderid: '8809617611753',
                    number: phone,
                    message: smsBody,
                },
            });

            toast.success('✅ OTP sent successfully!');
            setStep(2);
        } catch (error) {
            console.error(error);
            toast.error('❌ Failed to send OTP. Try again.');
        } finally {
            setLoading(false);
        }
    };

    // ✅ Step 2: Verify OTP
    const handleVerifyOtp = (e) => {
        e.preventDefault();
        if (otp === serverOtp) {
            toast.success('✅ OTP verified!');
            setStep(3);
        } else {
            toast.error('❌ Invalid OTP');
        }
    };

    // ✅ Step 3: Register User
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(`${API_URL}register.php`, {
                phone,
                name,
                password,
            });

            if (res.data.status === 'success') {
                toast.success('🎉 Registration successful!');
                setStep(1);
                setPhone('');
                setName('');
                setPassword('');
                setOtp('');
                router.push('/login');
            } else {
                toast.error(res.data.message || 'Registration failed.');
            }
        } catch (err) {
            console.error(err);
            toast.error('❌ Server error. Try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Register - IYF Lalmonirhat</title>
            </Head>
            <Container fluid style={{ backgroundColor: '#FFFFFF', height: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Card style={{ width: '100%', maxWidth: '400px' }}>
                    <Card.Body>
                        <h5 className="text-center fw-bold mb-4">
                            {step === 1 && 'Register with Phone'}
                            {step === 2 && 'Verify OTP'}
                            {step === 3 && 'Set Name & Password'}
                        </h5>

                        {step === 1 && (
                            <Form onSubmit={handleSendOtp}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="e.g. 017XXXXXXXX"
                                        required
                                    />
                                </Form.Group>
                                <Button type="submit" variant="primary" disabled={loading} className="w-100">
                                    {loading ? <Spinner size="sm" animation="border" /> : 'Send OTP'}
                                </Button>
                            </Form>
                        )}

                        {step === 2 && (
                            <Form onSubmit={handleVerifyOtp}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Enter OTP</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        placeholder="Enter OTP"
                                        required
                                    />
                                </Form.Group>
                                <Button type="submit" variant="success" className="w-100">
                                    Verify OTP
                                </Button>
                            </Form>
                        )}

                        {step === 3 && (
                            <Form onSubmit={handleRegister}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Create Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button type="submit" variant="success" disabled={loading} className="w-100">
                                    {loading ? <Spinner size="sm" animation="border" /> : 'Register'}
                                </Button>
                            </Form>
                        )}
                    </Card.Body>

                    <div className="mt-3 text-center mb-3">
                        <span className="small">
                            Don't have an account?{' '}
                            <Link href="/login" className="text-primary text-decoration-none">Sign In</Link>
                        </span>
                    </div>
                </Card>
                <ToastContainer />
            </Container>
        </>
    );
}
