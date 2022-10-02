import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import './css/navbar.css';

export default function SiteNavbar(props: any) {

  const profileIcon = props.user ? 'fa-solid profile-logged-in' : 'fa-regular';
  const profileIconLink = props.user ? '#' : 'registration/sign-in';
  const menuName = props.user ? props.user.user.username : 'Guest';
  const loggingIcon = props.user ? 'fa-arrow-right-from-bracket' : 'fa-arrow-right-to-bracket';
  const loggingTitle = props.user ? 'Logout' : 'Login';

  function handleSignOut() {
    if(props.user) props.setUser(null);
  }

  return (
    <Navbar expand={false} className='bg-light navbar-top'>
      <Container fluid>
        <Col>
          <Navbar.Toggle aria-controls={`offcanvasNavbar`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar`}
            aria-labelledby={`offcanvasNavbarLabel-expand`}
            placement="start"
            style={{
              maxWidth: '25%',
              maxHeight: '30%',
              borderRadius: '0 0 8px 0'
            }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                { menuName }
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav>
                <Link to='/'>
                  <i className={'fa-solid fa-house-chimney'}></i>
                  <span>   Home</span>
                </Link>
                <Link className='mt-2' to='/favorites'>
                  <i className={'fa-solid fa-heart'}></i>
                  <span>   Favorites</span>
                </Link>
                <Link onClick={handleSignOut} className='mt-2' to='/registration/sign-in'>
                  <i className={`fa-solid ${loggingIcon}`}></i>
                  <span>   { loggingTitle }</span>
                </Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Col>
        <Col className='text-center'>
          <Link to='/'>
            <h1 className='d-inline text-dark'>SmashMate</h1>
          </Link>
        </Col>
        <Col className='text-end'>
          <Link className={`${profileIcon} fa-user profile-icon`} to={profileIconLink}></Link>
        </Col>
      </Container>
    </Navbar>
  );
}
