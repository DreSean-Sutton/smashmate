import CreateAccount from '../components/registration/create-account';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function Registration(props: any) {
  return (
    <Container>
      <Row className='justify-content-center'>
        <Col sm={8} md={6} lg={4}>
          <Card className='bg-white p-3 mb-5'>
            <Card.Title className='text-center mb-3'>
              Create an Account
            </Card.Title>
            <Card.Body className='p-1'>
              <CreateAccount
                // setUser={props.handleSetUser}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
