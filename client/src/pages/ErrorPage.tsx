import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import './ErrorPage.css';

export default function ErrorPage() {
  return (
    <Container fluid='lg' className='error-page' data-testid='error-page'>
      <Row className='error-row'>
        <h1 className='text-center'>This is the Error page 😲</h1>
      </Row>
    </Container>
  )
}
