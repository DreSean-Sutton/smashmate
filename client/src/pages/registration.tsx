import CreateAccount from '../components/registration/create-account';
import SignIn from '../components/registration/sign-in';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import './registration.css';

export default function Registration(props: any) {

  let title, currentView;
  if(window.location.pathname.includes('sign-in')) {
    currentView = <SignIn setUser={props.setUser} />;
    title = 'Sign In';
  } else {
    currentView = <CreateAccount />;
    title = 'Create an Account';
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
                { title }
              </Card.Title>
              <Card.Body className='p-1'>
                { currentView }
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
