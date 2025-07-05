import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-light text-center text-lg-start mt-auto py-3 border-top">
            <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
                <span className="text-muted mb-2 mb-md-0">
                    &copy; {new Date().getFullYear()} Giridhari Lal. All rights reserved.
                </span>
            </div>
        </footer>
    );
}
