import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./popup.css";

function Popup_Rewards(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.selectedItem.point} pt
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{props.selectedItem.name}</h4>
        <p>{props.selectedItem.comment}</p>
        <p>{props.selectedItem.genre.name}</p>
        <div className="row">
          <div className="col-sm-12 text-center">
            <Button className="btn-popup" onClick={props.onClose}>
              Close
            </Button>
            <Button className="btn-popup" onClick={props.onConfirm}>
              Confirm
            </Button>
            <Button
              className="btn-popup"
              onClick={() => props.onDelete(props.selectedItem)}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onClose}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default Popup_Rewards;
