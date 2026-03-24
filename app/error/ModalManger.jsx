import React from 'react';
import { useSelector } from 'react-redux';
import SampleModalContent from './SampleModalContent'; // Example content component

const modalComponents = {
  SAMPLE_MODAL: SampleModalContent,
  // Add other modal types here
};

const ModalManager = () => {
  const modal = useSelector((state) => state.modal);
  const { isOpen, modalType, modalProps } = modal;

  if (!isOpen || !modalType) {
    return null;
  }

  const SpecificModal = modalComponents[modalType];

  return (
    <div className={`modal fade ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <SpecificModal {...modalProps} />
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </div>
  );
};

export default ModalManager;
