import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hook';
import { setUser, selectUser } from '../../features/account/userSlice';
import { Navbar } from 'react-bootstrap';
import { Offcanvas } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './OffcanvasNavbar.css';

export default function OffcanvasNavbar() {

  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const menuName = user ? user.account.username : 'Guest';
  const loggingIcon = user ? 'fa-arrow-right-from-bracket' : 'fa-arrow-right-to-bracket';
  const loggingTitle = user ? 'Logout' : 'Login';

  function closeOffcanvas () {
    // Manually closes offcanvas navbar and removes it's running functionality
    // A ridiculous solution to the ridiculous mobile problem bootstrap offcanvas has

    const offcanvasNavbar: any = document.querySelector('#offcanvasNavbar');
    offcanvasNavbar.click(function () {
      offcanvasNavbar.offcanvas('hide');
    });
    const body: any = document.querySelector('body');
    const originalStyle = { ...body.style };
    const closeButton: any = document.querySelector('.btn-close');
    const navbarToggler: any = document.querySelector('.navbar-toggler'); // class automatically given by bootstrap
    body.style = { ...originalStyle, overflow: "initial" };
    body.style = originalStyle;
    body.classList.remove('modal-open');
    offcanvasNavbar.classList.remove('show');
    document.querySelector('.offcanvas-backdrop')?.classList.remove('show');
    document.querySelector('.offcanvas-backdrop')?.classList.remove('offcanvas-backdrop');
    closeButton.click();
    setTimeout(() => { // if user doesn't do any inputs within 3000ms, navbar icon will unfocus
      navbarToggler.blur();
    }, 3000)
    return;
  }

  function handleSignOut() {
    closeOffcanvas();
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
              <Link onClick={closeOffcanvas}  className='offcanvas-link' to='/' title='Home'>
                <i className={'fa-solid d-lg-none fa-house-chimney'}></i>
                <span>Home</span>
              </Link>
            </li>
            <li className='offcanvas-li'>
              <Link onClick={closeOffcanvas} className='offcanvas-link mt-2' to='/favorites' title='Favorites'>
                <i className={'fa-solid d-lg-none fa-heart'}></i>
                <span>Favorites</span>
              </Link>
            </li>
            <li className='offcanvas-li'>
              <Link onClick={handleSignOut} className='offcanvas-link mt-2' to='/registration/sign-in' title={loggingTitle}>
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
