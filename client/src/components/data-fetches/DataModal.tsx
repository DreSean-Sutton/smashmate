import React, { useState, useEffect } from 'react';
import { Modal, Button, Container, Row } from 'react-bootstrap';
import './DataModal.css';

interface DataModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  changeCurrentDataType: (string) => void;
}
export default function DataModal(props: DataModalProps) {

  const [modalShow, setModalShow] = useState(true);

  useEffect(() => {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if(modalBackdrop) {
      modalBackdrop.addEventListener('click', (props.closeModal));
    }
  })

  return (
    <Modal show={props.modalIsOpen} className='modal-sm data-modal' tabIndex='-1' data-testid='data-modal'>
      <button onClick={props.closeModal} className='btn-close close-button' data-bs-dismiss='modal' aria-label="Close"></button>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content border-0'>
          <div className='buttons-div m-auto'>
            <Button
              onClick={() => {
                props.closeModal();
                props.changeCurrentDataType('moves');
              }}
              className='w-100 my-2 btn-warning'>Moves
            </Button>
            <Button
              onClick={() => {
                props.closeModal();
                props.changeCurrentDataType('throws');
              }}
              className='w-100 my-2'>Throws
            </Button>
            <Button
              onClick={() => {
                props.closeModal();
                props.changeCurrentDataType('movements');
              }}
              className='w-100 my-2'>Movements
            </Button>
            <Button
              onClick={() => {
                props.closeModal();
                props.changeCurrentDataType('stats');
              }}
              className='w-100 my-2'>Stats
            </Button>
            {/* Add a searchbar button some day */}
          </div>
        </div>
      </div>
    </Modal>
  )
}
