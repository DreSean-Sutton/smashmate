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
    <Navbar expand={'lg'} className='bg-warning navbar-top'>
      <Container fluid>
        <Col>
          <Navbar.Toggle style={{ color: 'grey'}} aria-controls={`offcanvasNavbar`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar`}
            aria-labelledby={`offcanvasNavbarLabel-expand`}
            placement="start"
            className='bg-warning offcanvas-navbar'
            style={{
              maxHeight: '30%',
              borderRadius: '0 0 8px 0'
            }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                { menuName }
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='pb-0 pt-0'>
              <Nav>
                <ul className='d-lg-flex offcanvas-ul'>
                  <li className='offcanvas-li'>
                    <Link className='offcanvas-link' to='/'>
                      <i className={'fa-solid d-lg-none fa-house-chimney'}></i>
                      <span>Home</span>
                    </Link>
                  </li>
                  <li className='offcanvas-li'>
                    <Link className='offcanvas-link mt-2' to='/favorites'>
                      <i className={'fa-solid d-lg-none fa-heart'}></i>
                      <span>Favorites</span>
                    </Link>
                  </li>
                  <li className='offcanvas-li'>
                    <Link onClick={handleSignOut} className='offcanvas-link mt-2' to='/registration/sign-in'>
                      <i className={`fa-solid d-lg-none ${loggingIcon}`}></i>
                      <span>{loggingTitle}</span>
                    </Link>
                  </li>
                </ul>
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
