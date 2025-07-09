// components/LeftSidebar.js
import Link from 'next/link';
import { Offcanvas, Nav } from 'react-bootstrap';
import { FaHome, FaStar, FaUsers, FaFolderOpen, FaInfoCircle, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

export default function LeftSidebar({ show, handleClose, isLoggedIn, userId, onLogout, userName }) {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="start" backdrop>
      <Offcanvas.Header closeButton className="border-bottom">
        <Offcanvas.Title className="fw-bold text-primary d-flex align-items-center">
          <FaUserCircle size={26} className="me-2 text-secondary" />
          {isLoggedIn ? `Hi, ${userName}` : 'Welcome'}
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="d-flex flex-column justify-content-between py-3">
        {/* Menu */}
        <Nav className="flex-column">
          <Link href="/" className="nav-link d-flex align-items-center mb-2">
            <FaHome className="me-2" /> Home
          </Link>
          <Link href="/topposts" className="nav-link d-flex align-items-center mb-2">
            <FaStar className="me-2" /> Top Posts
          </Link>
          <Link href="/users" className="nav-link d-flex align-items-center mb-2">
            <FaUsers className="me-2" /> Users
          </Link>
          <Link href="/categories" className="nav-link d-flex align-items-center mb-2">
            <FaFolderOpen className="me-2" /> Categories
          </Link>
          <Link href="/about" className="nav-link d-flex align-items-center mb-2">
            <FaInfoCircle className="me-2" /> About
          </Link>

          {isLoggedIn && (
            <>
              <hr />
              <Link href={`/user/${userId}`} className="nav-link d-flex align-items-center mb-2">
                <FaUserCircle className="me-2" /> My Profile
              </Link>
            </>
          )}
        </Nav>

        {/* Logout */}
        {isLoggedIn && (
          <div className="text-center mt-4">
            <button onClick={onLogout} className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center">
              <FaSignOutAlt className="me-2" /> Logout
            </button>
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
