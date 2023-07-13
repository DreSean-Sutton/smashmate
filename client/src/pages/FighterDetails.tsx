import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hook';
import { selectFighterArray } from '../features/fighters/fightersArraySlice';
import DataTables from '../components/data-fetches/DataTables';
import DataModal from '../components/data-fetches/DataModal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import fetchAFighter from '../lib/fetch-a-fighter';
import './FighterDetails.css';

export default function FighterDetails() {
  const fighterArray = useAppSelector(selectFighterArray);
  let navigate = useNavigate();
  let { fighter }: any = useParams();
  const [offset, setOffset] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const fighterDataValues: any[] = Object.values(fighterArray.fighterData);
  let fighterIndex: number = binarySearcher(Object.values(fighterDataValues), fighter);

  function binarySearcher (array: any, key: any) {
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

  function handlePreviousFighter () {
    if(fighterIndex === 0) {
      fighterIndex = fighterArray.length;
    }
    navigate(`/character-details/${fighterDataValues[fighterIndex - 1].fighter}`);
  }

  function handleNextFighter () {
    if (fighterIndex === fighterArray.length - 1) {
      fighterIndex = -1;
    }
    navigate(`/character-details/${fighterDataValues[fighterIndex + 1].fighter}`);
  }

  function handleOpenModal() {
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
  }

  function handleCheckTitle() {
    if (fighterArray.length !== 0) {
      return fighterDataValues[fighterIndex].displayName
    } else {
      fetchAFighter(fighter).then((res: any)=> res.displayName);
  }
}

  return (
    <Container className='frame-data-backdrop pt-4 pb-4 fighter-details' data-view='characterDetails'>
      <Row className='justify-content-between align-items-center'>
        <Col xs={2} md={3} xl={3} className='pr-0 text-center'>
          <i id='left-arrow' onClick={handlePreviousFighter} className="fa-solid fa-circle-arrow-left arrow-icons arrow-icon-left secondary-theme-color"></i>
        </Col>
        <Col xs={6} md={4} xl={3}>
          <Card className='tertiary-theme-bg w-100 text-center mb-2 p-1'>
            <Card.Title className='mb-0 pt-2 pb-2 fw-bolder'>{handleCheckTitle()}</Card.Title>
          </Card>
        </Col>
        <Col xs={2} md={3} xl={3} className='pl-0 text-center'>
          <i id='right-arrow' onClick={handleNextFighter} className="fa-solid fa-circle-arrow-right arrow-icons arrow-icon-right secondary-theme-color"></i>
        </Col>
      </Row>
      {/* <Row className='justify-content-center align-items-center mb-5'>
        <Col xs={8} md={6} xl={5} className='fighter-details-img p-2 bg-light typical-box-shadow rounded' style={{ zIndex: '0' }}>
          <Image rounded={true} src={`./images/smash-ultimate-sprites/${fighter}.png`} />
        </Col>
      </Row> */}
      <Row className='bg-light table-responsive p-2 mt-sm-2 mt-lg-4 rounded'>
        <DataModal modalIsOpen={modalOpen} closeModal={handleCloseModal} />
        <DataTables currentFighter={fighter} />
      </Row>
      <i onClick={handleOpenModal} className="fa-solid fa-bars arrow-icons options-bar secondary-theme-color" data-testid='data-navbar'></i>
          {/* <i id='up-arrow' onClick={handleScrollToTop} className="fa-solid fa-circle-arrow-up arrow-icons up-arrow arrow-icon-scrolling secondary-theme-color"></i> */}
    </Container>
  );
}
