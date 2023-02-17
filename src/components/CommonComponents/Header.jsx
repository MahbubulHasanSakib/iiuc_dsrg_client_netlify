import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, Navigate } from 'react-router-dom';
import Logo from '../assets/logo.png'
import { useParams } from 'react-router-dom';
import { useLocation,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppContext } from '../Context/userContext';
const Header = () => {
  const params = useParams()
  const navigate=useNavigate()
  const userData = useAppContext()
  // let userInfo=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
  const currentLocation = useLocation().pathname;
  const [userInfo, setUserInfo] = useState(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
  const handleLogOut = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null)
    userData.userInfo.setUser(null)
    navigate('/login')
  }

  return (
    <Navbar className='sticky-nav' expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img className='logoImg' src={Logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2"
          >
            <Nav.Link as={Link}
              className={`${currentLocation === "/" ? "activeNavLink" : ""}`}
              to="/">Home</Nav.Link>

            <NavDropdown
              className={`${(currentLocation !== "/about" && currentLocation !== "/publication"
                && currentLocation !== "/" && currentLocation !== "/activities" && currentLocation !== "/blogs" 
                && currentLocation !== "/add-blog" && !params.eid && !params.bid) ?
                "activeNavLink" : ""}`} title="Team" id="navbarScrollingDropdown">
              <NavDropdown.Item className={`${currentLocation === "/founder-and-head" ? "activeNavLink" : ""}`} as={Link} to="/founder-and-head">Founder and Head</NavDropdown.Item>
              <NavDropdown.Item className={`${currentLocation === "/advisory-panel" ? "activeNavLink" : ""}`} as={Link} to="/advisory-panel">Advisory Panel</NavDropdown.Item>
              <NavDropdown.Item className={`${currentLocation === "/faculty-members" ? "activeNavLink" : ""}`} as={Link} to="/faculty-members">Faculty Members</NavDropdown.Item>
              <NavDropdown.Item className={`${currentLocation === "/executive-committee" ? "activeNavLink" : ""}`} as={Link} to="/executive-committee">Executive Committee</NavDropdown.Item>
              <NavDropdown.Item className={`${currentLocation === "/members" || params.id ? "activeNavLink" : ""}`} as={Link} to="/members">General Members</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link}
              className={`${(currentLocation === "/activities"||params.eid) ? "activeNavLink" : ""}`}
              to="/activities">
              Activities
            </Nav.Link>
            
            <Nav.Link as={Link}
              className={`${currentLocation === "/publication" ? "activeNavLink" : ""}`}
              to="/publication">
              Publication
            </Nav.Link>
           
            <Nav.Link as={Link}
              className={`${currentLocation === "/blogs"||params.bid ? "activeNavLink" : ""}`}
              to="/blogs">
              Blogs
            </Nav.Link>
            {/* <Nav.Link as={Link}
              className={`${currentLocation === "/members" || params.id ? "activeNavLink" : ""}`}
              to="/members">
              Members
            </Nav.Link> */}

            <Nav.Link as={Link}
              className={`${currentLocation === "/about" ? "activeNavLink" : ""}`}
              to="/about">About</Nav.Link>
            {
              userInfo ?
                userInfo.isAdmin?
                <>
                  <NavDropdown
                    className={`${(currentLocation !== "/about" && currentLocation !== "/publication" && currentLocation !== "/" && currentLocation !== "/activities" && currentLocation !== "/blogs" && currentLocation !== "/members" && !(params.id)) ?
                      "activeNavLink" : ""}`} title="Admin" id="navbarScrollingDropdown">
                    <NavDropdown.Item as={Link} to="/admin">Add Member</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/membersList">Members List</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/add-faculty">Add Faculty</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/facultiesList">Faculties List</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/add-event">Add Event</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/auto-passwords">Auto Passwords</NavDropdown.Item>
                    <NavDropdown.Item >
                      <p onClick={handleLogOut}>Logout</p>

                    </NavDropdown.Item>
                  </NavDropdown>
                </> :
                <>
                 <NavDropdown
                    title={`${userInfo.username}`} id="navbarScrollingDropdown">
                      <NavDropdown.Item as={Link} to="/change-password">Change Password</NavDropdown.Item>
                    
                    <NavDropdown.Item as={Link} to="/my-profile">Profile</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/add-blog">Write Blog</NavDropdown.Item>
                     <NavDropdown.Item >
                      <p onClick={handleLogOut}>Logout</p>

                    </NavDropdown.Item>
                  </NavDropdown>
                </>:
                <Nav.Link as={Link}
                  to="/login">
                  <span style={{ cursor: "pointer" }}>Login</span>
                </Nav.Link>
            }
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;