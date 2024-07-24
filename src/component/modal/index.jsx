import { Modal } from "react-bootstrap";

function ModalModule({ isOpen, setIsOpen, children, heading }) {
  function handleClose() {
    setIsOpen(false);
  }

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

export { ModalModule };
