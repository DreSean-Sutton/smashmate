import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import MovesData from '../components/moves-data';
import ThrowsData from '../components/throws-data';
import MovementData from '../components/movement-data';
import StatsData from '../components/stats-data';
import { useNavigate } from 'react-router-dom';
interface FighterDetailsProps {
  fighterArray: any[]
}
export default function FighterDetails(props: FighterDetailsProps) {
  let navigate = useNavigate();
  let { fighter }: any = useParams();

  useEffect(() => {
    console.log({ fighter })
    window.scrollTo(0, 0);
  });

  const binarySearcher = (array: any, key: any) => {
    let start = 0;
    let end = array.length - 1;

    while (start <= end) {
      let middle = Math.floor((start + end) / 2);

      if (array[middle].fighter === key) {
        return middle;
      } else if (array[middle].fighter < key) {
        start = middle + 1;
      } else {
        end = middle - 1;
      }
    }
    return -1;
  }
  let test = binarySearcher(props.fighterArray, fighter);

  function previousFighter () {
    if(test === 0) {
      test = props.fighterArray.length;
    }
    navigate(`/character-details/${props.fighterArray[test - 1].fighter}`);
  }

  function nextFighter () {
    if (test === props.fighterArray.length - 1) {
      test = -1;
    }
    navigate(`/character-details/${props.fighterArray[test + 1].fighter}`);
  }
  return (
    <>
      <Container className='frame-data-backdrop pt-4 pb-4 fighter-details' data-view='characterDetails'>
        <Row>
          <Col>
            <i onClick={previousFighter} className="fa-solid fa-circle-arrow-left fighter-details-icons text-warning"></i>
          </Col>
          <Col className='text-end'>
            <i onClick={nextFighter} className="fa-solid fa-circle-arrow-right fighter-details-icons text-warning"></i>
          </Col>
        </Row>
        <Row className='justify-content-center align-items-center mb-5'>
          <Col xs={8} md={6} xl={5} className='fighter-details-img p-2 bg-light typical-box-shadow rounded' style={{ zIndex: '0' }}>
            <Image rounded={true} src={`./images/smash-ultimate-sprites/${fighter}.png`} />
          </Col>
        </Row>
        <Col id='moves' xs={6} md={4} className='m-auto typical'>
          <h2 className='text-center fs-2 mt-3 mb-3 p-2 bg-warning text-dark rounded'>Moves</h2>
        </Col>
        <Row xs={1} md={2} xl={3} className='rounded justify-content-center p-1'>
          <MovesData currentFighter={fighter} />
        </Row>
        <Col xs={6} md={4} className='m-auto typical'>
          <h2 className='text-center fs-2 mt-3 mb-3 p-2 bg-warning text-dark rounded'>Grabs/Throws</h2>
        </Col>
        <Row xs={1} md={2} xl={3} className='rounded justify-content-center p-1'>
          <ThrowsData currentFighter={fighter} />
        </Row>
        <Col xs={6} md={4} className='m-auto typical'>
          <h2 className='text-center fs-2 mt-3 mb-3 p-2 bg-warning text-dark rounded'>Dodges/Rolls</h2>
        </Col>
        <Row xs={1} md={2} xl={3} className='rounded justify-content-center p-1'>
          <MovementData currentFighter={fighter} />
        </Row>
        <Col xs={6} md={4} className='m-auto typical'>
          <h2 className='text-center fs-2 mt-3 mb-3 p-2 bg-warning text-dark rounded'>Stats</h2>
        </Col>
        <Row xs={2} xl={3} className='rounded justify-content-center p-1'>
          <StatsData currentFighter={fighter} />
        </Row>
      </Container>
    </>
  );
}
