import { Link } from "react-router-dom";
import '../../css/Navbar.css'; 

const Navbar = () => (
    <nav className="navbar">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/meals" className="nav-link">Create Logs</Link>
        <Link to="/goals" className="nav-link">Goals</Link>
        <Link to="/food" className="nav-link">Food Search</Link>
        <Link to="/calc" className="nav-link">Calculator</Link>
        <Link to="/" className="nav-link">Logout<box-icon name='log-out'></box-icon></Link>
    </nav>
);

export default Navbar;