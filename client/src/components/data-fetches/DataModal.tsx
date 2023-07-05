import React, { useState, useEffect } from 'react';
import { Modal, Button, Container, Row } from 'react-bootstrap';
import './DataModal.css';

export default function DataModal(props: any) {
  return (
    <Modal show='true' className='modal-sm data-modal' tabIndex='-1'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content border-0'>
          <div className='buttons-div m-auto'>
            <Button className='w-100 my-2'>Moves</Button>
            <Button className='w-100 my-2'>Throws</Button>
            <Button className='w-100 my-2'>Movements</Button>
            <Button className='w-100 my-2'>Stats</Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
