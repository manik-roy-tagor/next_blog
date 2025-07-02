import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-light text-center text-lg-start mt-auto py-3 border-top">
            <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
                <span className="text-muted mb-2 mb-md-0">
                    &copy; {new Date().getFullYear()} MyApp. All rights reserved.
                </span>
                <div>
                    <Link href="/" className="text-decoration-none me-3 text-secondary">Home</Link>
                    <Link href="/about" className="text-decoration-none me-3 text-secondary">About</Link>
                    <Link href="/contact" className="text-decoration-none text-secondary">Contact</Link>
                </div>
            </div>
        </footer>
    );
}
