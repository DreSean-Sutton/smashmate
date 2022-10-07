import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovesData from '../components/moves-data';
import ThrowsData from '../components/throws-data';
import MovementData from '../components/movement-data';
import StatsData from '../components/stats-data';
import './css/fighter-details.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface FighterDetailsProps {
  fighterArray: any[]
}

export default function FighterDetails(props: FighterDetailsProps) {
  let navigate = useNavigate();
  let { fighter }: any = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
  let fighterIndex = binarySearcher(props.fighterArray, fighter);

  function handlePreviousFighter () {
    if(fighterIndex === 0) {
      fighterIndex = props.fighterArray.length;
    }
    navigate(`/character-details/${props.fighterArray[fighterIndex - 1].fighter}`);
  }

  function handleNextFighter () {
    if (fighterIndex === props.fighterArray.length - 1) {
      fighterIndex = -1;
    }
    navigate(`/character-details/${props.fighterArray[fighterIndex + 1].fighter}`);
  }
  function handleCheckTitle() {
    if(props.fighterArray.length !== 0) {
      return props.fighterArray[fighterIndex].displayName
    } else {
      fetchTitle().then(res => {
        console.count('fetchTitle')
        console.log(fighter);
        return res;
      })
    }
  }
  async function fetchTitle() {
    try {
      const res = await axios.get(`https://the-ultimate-api.herokuapp.com/api/fighters?fighter=${fighter}`);
      return await res.data.displayName;
    } catch (e) {
      console.error('fetch failed', e);
    }
  }
  return (
    <>
      <Container className='frame-data-backdrop pt-4 pb-4 fighter-details' data-view='characterDetails'>
        <Row className='justify-content-between align-items-center'>
          <Col xs={2} md={3} xl={3} className='pr-0 text-center'>
            <i onClick={handlePreviousFighter} className="fa-solid fa-circle-arrow-left fighter-details-icons text-warning"></i>
          </Col>
          <Col xs={6} md={4} xl={3}>
            <Card className='bg-warning w-100 text-center mb-2 p-1'>
              <Card.Title className='mb-0 pt-2 pb-2 fw-bold'>{handleCheckTitle()}</Card.Title>
            </Card>
          </Col>
          <Col xs={2} md={3} xl={3} className='pl-0 text-center'>
            <i onClick={handleNextFighter} className="fa-solid fa-circle-arrow-right fighter-details-icons text-warning"></i>
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
