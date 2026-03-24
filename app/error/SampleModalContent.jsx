import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/redux/slices/modalGenSlice';
import { enableLoader, disableLoader } from '@/redux/slices/loadingSlice'; // Import loader actions

const SampleModalContent = ({ title, message }) => {
  const dispatch = useDispatch();

  const handleConfirm = () => {
    // Dispatch enableLoader() before an async operation
    dispatch(enableLoader()); 
    console.log("Loader enabled. Performing some action...");
    
    // Simulate an async operation
    setTimeout(() => {
      console.log("Async action complete.");
      dispatch(disableLoader()); // Disable loader after
      dispatch(closeModal()); // Close modal
    }, 1500);
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title">{title}</h5>
        <button type="button" className="close" onClick={handleCancel}>
          <span>&times;</span>
        </button>
      </div>
      <div className="modal-body">{message}</div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
        <button type="button" className="btn btn-primary" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </>
  );
};

export default SampleModalContent;
