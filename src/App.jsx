import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 justify-items-center align-content-center">
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
