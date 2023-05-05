import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Reactklient</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/createperson">New Person</Link>
      </div>
    </nav>
  );
}

export default Navbar;
