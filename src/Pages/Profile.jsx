import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [confirmDelete, setConfirmDelete] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser) navigate("/");
        setUser(currentUser);
    }, [navigate]);

    const updateProfile = () => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.map((u) =>
            u.email === user.email ? user : u
        );

        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("currentUser", JSON.stringify(user));

        setMessage("Profile updated successfully!");
        setTimeout(() => setMessage(""), 3000);
        setEditMode(false);
    };

    const deleteAccount = () => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const filtered = users.filter((u) => u.email !== user.email);

        localStorage.setItem("users", JSON.stringify(filtered));
        localStorage.removeItem("currentUser");

        navigate("/");
    };

    const logout = () => {
        localStorage.removeItem("currentUser");
        navigate("/");
    };

    if (!user) return null;

    return (
        <div className="container-fluid min-vh-100 bg-light">
            <div className="container py-5">
                {/* Success Message */}
                {message && (
                    <div className="row justify-content-center mb-4">
                        <div className="col-md-8 col-lg-6">
                            <div className="alert alert-success alert-dismissible fade show d-flex align-items-center shadow-sm" role="alert">
                                <i className="bi bi-check-circle-fill me-3 fs-5"></i>
                                <div className="flex-grow-1">{message}</div>
                                <button type="button" className="btn-close" onClick={() => setMessage("")}></button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="row justify-content-center">
                    {/* Left Column - Profile Card */}
                    <div className="col-lg-4 col-md-5 mb-4">
                        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                            <div className="card-header bg-dark bg-gradient text-white py-4">
                                <div className="d-flex justify-content-center">
                                    <div className="position-relative">
                                        <div className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center"
                                            style={{ width: '120px', height: '120px', fontSize: '48px', fontWeight: 'bold' }}>
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="position-absolute bottom-0 end-0 bg-success border border-3 border-white rounded-circle p-2"></span>
                                    </div>
                                </div>
                                <h4 className="text-center mt-3 mb-1 fw-bold">{user.name}</h4>
                                <p className="text-center text-white-50 mb-0">
                                    <i className="bi bi-envelope me-2"></i>
                                    {user.email}
                                </p>
                            </div>

                            <div className="card-body">
                                <div className="d-grid gap-2 mt-4">
                                    <button className="btn btn-outline-primary" onClick={logout}>
                                        <i className="bi bi-box-arrow-right me-2"></i>
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="col-lg-8 col-md-7">
                        <div className="card border-0 shadow-lg rounded-4 h-100">
                            <div className="card-header bg-white border-0 py-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h3 className="mb-0 fw-bold">
                                        <i className="bi bi-person-circle me-3 text-primary"></i>
                                        Account Settings
                                    </h3>
                                    <div>
                                        {!editMode ? (
                                            <button
                                                className="btn btn-primary rounded-pill px-4"
                                                onClick={() => setEditMode(true)}
                                            >
                                                <i className="bi bi-pencil-square me-2"></i>
                                                Edit Profile
                                            </button>
                                        ) : (
                                            <div className="d-flex gap-2">
                                                <button
                                                    className="btn btn-outline-secondary rounded-pill px-4"
                                                    onClick={() => setEditMode(false)}
                                                >
                                                    <i className="bi bi-x-lg me-2"></i>
                                                    Cancel
                                                </button>
                                                <button
                                                    className="btn btn-success rounded-pill px-4"
                                                    onClick={updateProfile}
                                                >
                                                    <i className="bi bi-check-lg me-2"></i>
                                                    Save Changes
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="card-body p-4 p-lg-5">
                                <form>

                                    <div className="mb-4">
                                        <label className="form-label fw-semibold text-muted mb-2">
                                            <i className="bi bi-person me-2"></i>
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control form-control-lg ${editMode ? 'border-primary' : ''}`}
                                            value={user.name}
                                            disabled={!editMode}
                                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                                            style={{
                                                backgroundColor: editMode ? '#fff' : '#f8f9fa',
                                                borderLeft: editMode ? '4px solid #0d6efd' : 'none'
                                            }}
                                        />
                                    </div>


                                    <div className="mb-4">
                                        <label className="form-label fw-semibold text-muted mb-2">
                                            <i className="bi bi-envelope me-2"></i>
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control form-control-lg bg-light"
                                            value={user.email}
                                            disabled
                                        />
                                        <small className="text-muted mt-1">Email cannot be changed</small>
                                    </div>


                                    <div className="mb-4">
                                        <label className="form-label fw-semibold text-muted mb-2">
                                            <i className="bi bi-lock me-2"></i>
                                            Password
                                        </label>
                                        <div className="input-group input-group-lg">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className={`form-control ${editMode ? 'border-primary' : ''}`}
                                                value={user.password}
                                                disabled={!editMode}
                                                onChange={(e) =>
                                                    setUser({ ...user, password: e.target.value })
                                                }
                                                style={{
                                                    backgroundColor: editMode ? '#fff' : '#f8f9fa',
                                                    borderLeft: editMode ? '4px solid #0d6efd' : 'none'
                                                }}
                                            />
                                            <button
                                                className={`btn ${editMode ? 'btn-outline-primary' : 'btn-outline-secondary'}`}
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                disabled={!editMode}
                                            >
                                                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                            </button>
                                        </div>
                                        {editMode && (
                                            <small className="text-muted mt-1">
                                                Password must be at least 8 characters long
                                            </small>
                                        )}
                                    </div>


                                    <div className="mt-5 pt-4 border-top">
                                        <h5 className="text-danger mb-4 fw-bold">
                                            <i className="bi bi-exclamation-triangle me-2"></i>
                                            Restrict
                                        </h5>

                                        {!confirmDelete ? (
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger rounded-pill px-4"
                                                onClick={() => setConfirmDelete(true)}
                                            >
                                                <i className="bi bi-trash me-2"></i>
                                                Delete Account
                                            </button>
                                        ) : (
                                            <div className="alert alert-danger border-danger">
                                                <h6 className="fw-bold mb-3">Are you sure you want to delete your account?</h6>
                                                <div className="d-flex gap-2">
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-secondary btn-sm"
                                                        onClick={() => setConfirmDelete(false)}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-sm"
                                                        onClick={deleteAccount}
                                                    >
                                                        Delete Account
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}