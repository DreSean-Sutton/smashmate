import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom'

export default function SiteNavbar(props: any) {

  return (
    <Navbar expand={false} className='bg-light navbar-top'>
      <Container fluid>
        <Col>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand`}
            aria-labelledby={`offcanvasNavbarLabel-expand`}
            placement="start"
            style={{ maxWidth: '25%' }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav>
                <Link to='/'>
                  <p>Home</p>
                      {/* <i className={'fa-solid fa-house-chimney house-icon'}></i> */}
                </Link>
                <Link to='/favorites'>
                  <p>Favorites</p>
                  {/* <i className={'fa-solid fa-heart heart-icon-list'}>Favorites</i> */}
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
          <Link to='/favorites'>
            <i className='fa-regular fa-user profile-icon'></i>
            {/* <i className={'fa-solid fa-heart heart-icon-list'}></i> */}
          </Link>
        </Col>
      </Container>
    </Navbar>
  );
}
