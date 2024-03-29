import { Card } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

interface FetchProps {
  data: string
}
export default function FetchDataFail(props: FetchProps) {
  return (
    <Col className='p-3'>
      <Card className='p-2 bg-light text-dark typical-box-shadow text-center'>
        <Card.Title className='fw-bold'>Sorry</Card.Title>
        <p className='mb-0 pt-3'>{props.data} cannot be found.</p>
      </Card>
    </Col>
  );
}
