import { Link } from "react-router-dom";
import styled from 'styled-components';

//render navbar
const Navbar = () => {
  return (
    <nav className="navbar">
        <LogoLink to="/">Reactklient</LogoLink>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/createperson">New Person</Link>
      </div>
    </nav>
  );
}

export default Navbar;

//styling title as a logo
const LogoLink = styled(Link)`
  color: var(--color-secondary-5);
  font-size: 32px;
  font-family: var(--font-family-2);
  letter-spacing: 2px;

  &:hover {
    color: var(--color-secondary-5);
  }
}
`;
