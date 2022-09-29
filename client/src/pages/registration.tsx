import CreateAccount from '../components/registration/create-account';
import SignIn from '../components/registration/sign-in';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

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
    <Container>
      <Row className='justify-content-center'>
        <Col sm={8} md={6} lg={4}>
          <Card className='bg-white p-3 mb-5'>
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
  );
}
