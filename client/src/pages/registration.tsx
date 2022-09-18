import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Registration() {
  return (
    <Container>
      <Row className='justify-content-center'>
        <Col md={8} lg={6}>
          <Card className='bg-white p-3 mt-4'>
            <Card.Title className='text-center'>
              Create an Account
            </Card.Title>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formRegistrationEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formRegistrationPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                  <Form.Text className="text-muted">
                    Must be 8-20 characters.
                  </Form.Text>
                </Form.Group>

                <div className='text-end'>
                  <Button variant="primary" type="submit">
                    Create
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
