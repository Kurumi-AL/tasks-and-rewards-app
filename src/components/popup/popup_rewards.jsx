import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./popup.css";

function Popup_Rewards({ show, selectedItem, onClose, onConfirm, onDelete }) {
  if (!selectedItem) return;

  return (
    <Modal
      show={show}
      onHide={onClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {selectedItem.points} pt
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{selectedItem.name}</h4>
        <p>{selectedItem.comment}</p>
        <div className="row">
          <div className="col-sm-12 text-center">
            <Button className="btn-popup" onClick={onClose}>
              Close
            </Button>
            <Button
              className="btn-popup"
              onClick={() => onConfirm({ selectedItem, onClose })}
            >
              Exchange
            </Button>
            <Button
              className="btn-popup"
              onClick={() => onDelete({ selectedItem, onClose })}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Popup_Rewards;
