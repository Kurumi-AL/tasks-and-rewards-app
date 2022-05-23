import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "./popup.css";

function Popup_Form(props) {
  return (
    <Modal show={props.show} onHide={props.onClose}>
      {/* <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="popupForm.name">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" autoFocus />
          </Form.Group>
          <Form.Group className="mb-3" controlId="popupForm.point">
            <Form.Label>Point</Form.Label>
            <Form.Control type="number" rows={3} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="popupForm.comment">
            <Form.Label>Comment</Form.Label>
            <Form.Control type="textarea" rows={3} />
          </Form.Group>
          <Form.Group controlId="popupForm.genre">
            <Form.Label>Genre</Form.Label>
            <Form.Control as="select">
              {props.genres.map((g) => (
                <option key={g.id}>{g.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
        <Button variant="success" onClick={props.onConfirm}>
          Add!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Popup_Form;
