import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

export default function CardSelectModal(props: any) {
  return (
    <Modal size='sm' centered show={props.modal} className='character-card-modal text-center'>
      <Modal.Header className='d-block'>Select Details</Modal.Header>
      <div className=''>
        <Dropdown className='w-50 mt-3 mb-3' as={ButtonGroup}>
          <Link to={`/character-details/${props.focusedFighter.fighter}`}>
            <Button variant="warning">Details</Button>
          </Link>
          <Dropdown.Toggle split variant="warning" id="dropdown-split-basic" />
          <Dropdown.Menu>
            <Link to=''>
              <Dropdown.Item href="#/action-1">Moves</Dropdown.Item>
            </Link>
            <Link to=''>
              <Dropdown.Item href="#/action-2">Grabs/Throws</Dropdown.Item>
            </Link>
            <Link to=''>
              <Dropdown.Item href="#/action-3">Dodges/Rolls</Dropdown.Item>
            </Link>
            <Link to=''>
              <Dropdown.Item href="#/action-4">Stats</Dropdown.Item>
            </Link>
          </Dropdown.Menu>
        </Dropdown>
      </div>

    </Modal>
  )
}
