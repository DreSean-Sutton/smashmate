import CreateAccount from '../components/create-account';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function Registration() {
  return (
    <Container>
      <Row className='justify-content-center'>
        <Col sm={8} md={6} lg={4}>
          <Card className='bg-white p-3 mb-5'>
            <Card.Title className='text-center mb-3'>
              Create an Account
            </Card.Title>
            {/* Later change Card.Body into its own component */}
            <Card.Body className='p-1'>
              <CreateAccount />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
