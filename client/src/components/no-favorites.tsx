import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import './css/no-favorites.css';

export default function NoFavorites() {
  return(
    <Container fluid='lg' className=''>
      <Row className='no-favorites-row'>
        <Col sm={6} lg={4} xxl={3} className='text-center'>
          <Card className='pt-3 pb-3 mt-0 bg-warning'>
            <h4 className='mt-0 text-capitalize'>Favorites are empty...</h4>
            <Link className='no-favorites-link' to={'/'}>Add some!</Link>
          </Card>
        </Col>
      </Row>
    </Container>
    // <h1>This worked 😲</h1>
  )
}
