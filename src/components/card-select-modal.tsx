import React from 'react';
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

export default function CardSelectModal(props: any) {
  return (
    <Modal size='sm' centered show={props.modal} className='character-card-modal text-center'>
      <Modal.Header className='d-block'>Select Details</Modal.Header>
      <div className=''>
        <Dropdown className='w-50 mt-3 mb-3' as={ButtonGroup}>
          <Button variant="warning">Details</Button>

          <Dropdown.Toggle split variant="warning" id="dropdown-split-basic" />

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Moves</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Grabs/Throws</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Dodges/Rolls</Dropdown.Item>
            <Dropdown.Item href="#/action-4">Stats</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

    </Modal>
  )
}
