import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import './offcanvas-navbar.css';

export default function OffcanvasNavbar(props: any) {
  const menuName = props.user ? props.user.user.username : 'Guest';
  const loggingIcon = props.user ? 'fa-arrow-right-from-bracket' : 'fa-arrow-right-to-bracket';
  const loggingTitle = props.user ? 'Logout' : 'Login';

  function handleSignOut() {
    if (props.user) props.setUser(null);
  }

return (
  <>
    <Navbar.Toggle aria-controls={`offcanvasNavbar`} />
    <Navbar.Offcanvas
      id={`offcanvasNavbar`}
      aria-labelledby={`offcanvasNavbarLabel-expand`}
      placement="start"
      className='offcanvas-navbar primary-theme-bg'
      style={{
        maxHeight: '25%',
        borderRadius: '0 0 8px 0'
      }} >
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
  </>
  )
}
