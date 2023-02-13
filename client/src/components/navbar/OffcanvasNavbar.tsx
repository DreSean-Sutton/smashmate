import { useAppSelector, useAppDispatch } from '../../app/hook';
import { setUser, selectUser } from '../../features/account/userSlice';
import { Navbar } from 'react-bootstrap';
import { Offcanvas } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './OffcanvasNavbar.css';

export default function OffcanvasNavbar() {

  const user = useAppSelector(selectUser);
  const menuName = user ? user.account.username : 'Guest';
  const loggingIcon = user ? 'fa-arrow-right-from-bracket' : 'fa-arrow-right-to-bracket';
  const loggingTitle = user ? 'Logout' : 'Login';
  const dispatch = useAppDispatch();

  function handleSignOut() {
    if (user) dispatch(setUser(null));
  }

return (
  <>
    <Navbar.Toggle aria-controls={`offcanvasNavbar`} />
    <Navbar.Offcanvas
      id={`offcanvasNavbar`}
      aria-labelledby={`offcanvasNavbarLabel-expand`}
      placement="start"
      className='offcanvas-navbar'
      style={{
        maxHeight: '25%',
        borderRadius: '0 0 8px 0'
      }} >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title id={`offcanvasNavbarLabel-expand`} className='secondary-theme-color'>
          { menuName }
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className='offcanvas-body pb-0 pt-0'>
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
