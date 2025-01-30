import { Link } from "react-router-dom";
import '../../css/Navbar.css'; 

const Navbar = () => (
    <nav className="navbar">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/meals" className="nav-link">Meals</Link>
        <Link to="/goals" className="nav-link">Goals</Link>
        <Link to="/" className="nav-link">Logout</Link>
    </nav>
);

export default Navbar;