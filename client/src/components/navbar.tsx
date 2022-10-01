import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import './css/navbar.css';

export default function SiteNavbar(props: any) {

  const profileIcon = props.user ? 'fa-solid profile-logged-in' : 'fa-regular';

  return (
    <Navbar expand={false} className='bg-light navbar-top'>
      <Container fluid>
        <Col>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand`}
            aria-labelledby={`offcanvasNavbarLabel-expand`}
            placement="start"
            style={{
              maxWidth: '25%',
              maxHeight: '25%',
              borderRadius: '0 0 8px 0'
            }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav>
                {/* house-icon */}
                <Link className='mb-2' to='/'>
                  <i className={'fa-solid fa-house-chimney'}></i>
                  <span>  Home</span>
                </Link>
                {/* heart-icon-list */}
                <Link to='/favorites'>
                  <i className={'fa-solid fa-heart'}></i>
                  <span>  Favorites</span>
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
          <Link className={`${profileIcon} fa-user profile-icon`} to='/favorites'></Link>
        </Col>
      </Container>
    </Navbar>
  );
}
