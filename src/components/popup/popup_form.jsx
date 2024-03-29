import { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { addTask } from "../../firebase/taskService";
import { addReward } from "../../firebase/rewardService";
import { UserContext } from "../../utils/userContext";
import "./popup.css";

function Popup_Form(props) {
  const onClose = props.onClose;
  const path = props.path;
  const [currUser, setCurrUser] = useContext(UserContext);

  const [newTitle, setNewTitle] = useState("");
  const [newPoint, setNewPoint] = useState(0);
  const [newComment, setNewComment] = useState("");

  return (
    <Modal show={props.show} onHide={onClose}>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="popupForm.name">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              onChange={(event) => {
                setNewTitle(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="popupForm.point">
            <Form.Label>Point</Form.Label>
            <Form.Control
              type="number"
              rows={3}
              onChange={(event) => {
                setNewPoint(Number(event.target.value));
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="popupForm.comment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              type="textarea"
              rows={3}
              onChange={(event) => {
                setNewComment(event.target.value);
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-popup" variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          className="btn-popup"
          variant="success"
          onClick={
            path === "tasks"
              ? () =>
                  addTask({
                    newTitle,
                    newPoint,
                    newComment,
                    currUser,
                    setCurrUser,
                    onClose,
                  })
              : () =>
                  addReward({
                    newTitle,
                    newPoint,
                    newComment,
                    currUser,
                    setCurrUser,
                    onClose,
                  })
          }
        >
          Add!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Popup_Form;
