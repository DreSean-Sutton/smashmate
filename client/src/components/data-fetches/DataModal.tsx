import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal, Button, Container, Row } from 'react-bootstrap';
import './DataModal.css';

interface DataModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
}
export default function DataModal(props: DataModalProps) {

  const [modalShow, setModalShow] = useState(true);
  const { fighter, currentDataType } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if(modalBackdrop) {
      modalBackdrop.addEventListener('click', (props.closeModal));
    }
  })

  function handleCheckSelection(button: string) {
    return button === currentDataType
      ? 'btn-warning'
      : '';
  }

  return (
    <Modal show={props.modalIsOpen} className='modal-sm data-modal' tabIndex='-1' data-testid='data-modal'>
      <button onClick={props.closeModal} className='btn-close close-button' data-bs-dismiss='modal' aria-label="Close"></button>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content border-0'>
          <div className='buttons-div m-auto'>
            <Button
              onClick={() => {
                props.closeModal();
                navigate(`/character-details/${fighter}/moves`);
              }}
              className={`w-100 my-2 ${handleCheckSelection('moves')}`}
              title='Move data'>Moves
            </Button>
            <Button
              onClick={() => {
                props.closeModal();
                navigate(`/character-details/${fighter}/throws`);
              }}
              className={`w-100 my-2 ${handleCheckSelection('throws')}`}
              title='Throw data'>Throws
            </Button>
            <Button
              onClick={() => {
                props.closeModal();
                navigate(`/character-details/${fighter}/movements`);
              }}
              className={`w-100 my-2 ${handleCheckSelection('movements')}`}
              title='Movement data'>Movements
            </Button>
            <Button
              onClick={() => {
                props.closeModal();
                navigate(`/character-details/${fighter}/stats`);
              }}
              className={`w-100 my-2 ${handleCheckSelection('stats')}`}
              title='Stat data'>Stats
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
