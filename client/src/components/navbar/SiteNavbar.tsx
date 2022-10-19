import OffcanvasNavbar from './OffcanvasNavbar';
import { Container } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hook';
import { selectUser } from '../../features/account/userSlice';
import './SiteNavbar.css';

export default function SiteNavbar() {

  const user = useAppSelector(selectUser);
  const profileIcon = user ? 'fa-solid profile-logged-in' : 'fa-regular';
  const profileIconLink = user ? '#' : 'registration/sign-in';

  return (
    <Navbar expand={'lg'} className='primary-theme-bg navbar-top'>
      <Container fluid>
        <Col>
          <OffcanvasNavbar />
        </Col>
        <Col className='text-center'>
          <Link to='/'>
            <h1 className='d-inline text-light'>SmashMate</h1>
          </Link>
        </Col>
        <Col className='text-end'>
          <Link className={`${profileIcon} fa-user profile-icon`} to={profileIconLink}></Link>
        </Col>
      </Container>
    </Navbar>
  );
}
