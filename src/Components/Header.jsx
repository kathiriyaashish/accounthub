import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("currentUser"));

    const logout = () => {
        localStorage.removeItem("currentUser");
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black bg-gradient shadow-sm sticky-top">
            <div className="container">
                {/* Brand Logo */}
                <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center" to="/">
                    <div className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{ width: '36px', height: '36px' }}>
                        <i className="bi bi-shield-check"></i>
                    </div>
                    <span>AccountHub</span>
                </Link>

                {/* Mobile Toggle Button */}
                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navigation Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        {!user ? (
                            <>
                                {/* Not Logged In */}
                                <li className="nav-item">
                                    <Link className="nav-link px-3 d-flex align-items-center" to="/">
                                        <i className="bi bi-box-arrow-in-right me-1"></i>
                                        <span>Login</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-light text-primary px-4 ms-2 rounded-pill d-flex align-items-center" to="/register">
                                        <i className="bi bi-person-plus me-2"></i>
                                        <span>Get Started</span>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>

                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle d-flex align-items-center px-3 bg-white bg-opacity-10 "
                                        href="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <div className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center me-2"
                                            style={{ width: '36px', height: '36px', fontSize: '16px', fontWeight: 'bold' }}>
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="d-flex flex-column">
                                            <span className="fw-medium">{user.name.split(' ')[0]}</span>
                                            <small className="text-white-50" style={{ fontSize: '0.75rem' }}>
                                                {user.email}
                                            </small>
                                        </div>
                                        <i className="bi bi-chevron-down ms-2"></i>
                                    </a>

                                    <ul className="dropdown-menu shadow-lg border-0 rounded-3 mt-2" style={{ minWidth: '250px' }}>

                                        <li>
                                            <Link className="dropdown-item d-flex align-items-center py-3" to="/profile">
                                                <i className="bi bi-person-circle me-3 fs-5 text-primary"></i>
                                                <div>
                                                    <div className="fw-medium">Profile Settings</div>
                                                    <small className="text-muted">Manage your account</small>
                                                </div>
                                            </Link>
                                        </li>

                                        <li>
                                            <button
                                                className="dropdown-item d-flex align-items-center py-3 text-danger"
                                                onClick={logout}
                                            >
                                                <i className="bi bi-box-arrow-right me-3 fs-5"></i>
                                                <div>
                                                    <div className="fw-medium">Logout</div>
                                                    <small className="text-muted">Sign out of your account</small>
                                                </div>
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}