import react from "react";
import "../StyleSheet/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
            <a href="/">THREADS</a>
        </div>

        <div className="nav-search">
            <input type="text" placeholder="Type here to search" />
            <button type="submit">🔍</button>
        </div>

        <div className="nav-links">
            <button className="login-btn">login</button>
            <div className="nav-item">
                <span>Become a sellor</span>
            </div>
            <div className="nav-item cart">
                <span>🛒</span>
                <p>cart</p>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
