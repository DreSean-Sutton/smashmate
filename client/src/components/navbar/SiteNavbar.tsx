import OffcanvasNavbar from './OffcanvasNavbar'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './SiteNavbar.css';

export default function SiteNavbar(props: any) {

  const profileIcon = props.user ? 'fa-solid profile-logged-in' : 'fa-regular';
  const profileIconLink = props.user ? '#' : 'registration/sign-in';

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
