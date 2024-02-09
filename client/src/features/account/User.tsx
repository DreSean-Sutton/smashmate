import CreateAccount from '../../components/registration/CreateAccount';
import SignIn from '../../components/registration/SignIn';
import ErrorPage from '../../pages/ErrorPage';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import './User.css';

export default function User() {

  let title, currentView;
  if (window.location.pathname.includes('sign-in')) {
    currentView = <SignIn />;
    title = 'Sign In';
  } else if(window.location.pathname.includes('create-account')) {
    currentView = <CreateAccount />;
    title = 'Create an Account';
  } else {
    return (<ErrorPage />);
  }
  return (
    <>
      <div className="background-registration-layout"></div>
      <Container style={{
        marginTop: '10rem'
      }}>
        <Row className='justify-content-center align-items-center'>
          <Col sm={8} md={6} lg={4}>
            <Card className='bg-white p-3'>
              <Card.Title className='text-center mb-3'>
                {title}
              </Card.Title>
              <Card.Body className='p-1'>
                {currentView}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
