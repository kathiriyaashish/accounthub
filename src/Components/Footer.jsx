
export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-auto">
      <div className="container py-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h5 className="mb-3 fw-bold">
              Account Task
            </h5>
            <p className="text-white-50 mb-0">
              Secure and professional account management system
            </p>
          </div>
          <div className="col-md-6 text-md-end mt-3 mt-md-0">
            <p className="mb-0 text-white-50">
              Made with  <i className="bi bi-heart me-2"></i>
              © {new Date().getFullYear()} All Rights Reserved.
            </p>
            <div className="mt-2">
              <a href="#" className="text-white-50 me-3 text-decoration-none">Privacy Policy</a>
              <a href="#" className="text-white-50 text-decoration-none">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}