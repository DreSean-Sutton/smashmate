import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hook';
import { selectFighterArray } from '../features/fighters/fightersArraySlice';
import MovesData from '../components/data-fetches/MovesData';
import ThrowsData from '../components/data-fetches/ThrowsData';
import MovementData from '../components/data-fetches/MovementData';
import StatsData from '../components/data-fetches/StatsData';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import './FighterDetails.css';

export default function FighterDetails() {
  const fighterArray = useAppSelector(selectFighterArray);
  let navigate = useNavigate();
  let { fighter }: any = useParams();
  const [offset, setOffset] = useState(0);

  useEffect(() => {

    const onScroll = () => setOffset(window.pageYOffset);
    // This cleans up code
    window.removeEventListener('scroll', onScroll);
    handleArrowDimming();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [fighter]);

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
  let fighterIndex = binarySearcher(fighterArray, fighter);

  function handlePreviousFighter () {
    if(fighterIndex === 0) {
      fighterIndex = fighterArray.length;
    }
    navigate(`/character-details/${fighterArray[fighterIndex - 1].fighter}`);
  }

  function handleNextFighter () {
    if (fighterIndex === fighterArray.length - 1) {
      fighterIndex = -1;
    }
    navigate(`/character-details/${fighterArray[fighterIndex + 1].fighter}`);
  }

  function handleCheckTitle() {
    if(fighterArray.length !== 0) {
      return fighterArray[fighterIndex].displayName
    } else {
      fetchTitle().then(res => {
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

  const handleArrowDimming = () => {
    const leftArrow: any = document.querySelector('#left-arrow');
    const rightArrow: any = document.querySelector('#right-arrow');
    if(offset !== 0) {
      leftArrow.classList.add('arrow-icon-scrolling');
      rightArrow.classList.add('arrow-icon-scrolling');
    } else {
      leftArrow.classList.remove('arrow-icon-scrolling');
      rightArrow.classList.remove('arrow-icon-scrolling');
    }
  }

  return (
    <Container className='frame-data-backdrop pt-4 pb-4 fighter-details' data-view='characterDetails'>
      <Row className='justify-content-between align-items-center'>
        <Col xs={2} md={3} xl={3} className='arrow-columns pr-0 text-center'>
          <i id='left-arrow' onClick={handlePreviousFighter} className="fa-solid fa-circle-arrow-left arrow-icons arrow-icon-left secondary-theme-color"></i>
        </Col>
        <Col xs={6} md={4} xl={3}>
          <Card className='secondary-theme-bg w-100 text-center mb-2 p-1'>
            <Card.Title className='mb-0 pt-2 pb-2 fw-bolder'>{handleCheckTitle()}</Card.Title>
          </Card>
        </Col>
        <Col xs={2} md={3} xl={3} className='arrow-columns pl-0 text-center'>
          <i id='right-arrow' onClick={handleNextFighter} className="fa-solid fa-circle-arrow-right arrow-icons arrow-icon-right secondary-theme-color"></i>
        </Col>
      </Row>
      <Row className='justify-content-center align-items-center mb-5'>
        <Col xs={8} md={6} xl={5} className='fighter-details-img p-2 bg-light typical-box-shadow rounded' style={{ zIndex: '0' }}>
          <Image rounded={true} src={`./images/smash-ultimate-sprites/${fighter}.png`} />
        </Col>
      </Row>
      <MovesData currentFighter={fighter} />
      <ThrowsData currentFighter={fighter} />
      <MovementData currentFighter={fighter} />
      <StatsData currentFighter={fighter} />
    </Container>
  );
}
