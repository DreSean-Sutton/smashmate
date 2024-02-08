import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import './NoFavorites.css';

export default function NoFavorites() {
  return(
    <Container fluid='lg' className=''>
      <Row className='no-favorites-row'>
        <Col sm={6} lg={4} className='text-center'>
          <Card className='pt-3 pb-3 mt-0 bg-warning'>
            <h4 className='mt-0 text-capitalize'>Favorites are empty...</h4>
            <Link className='no-favorites-link' to={'/'}>Add some!</Link>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
