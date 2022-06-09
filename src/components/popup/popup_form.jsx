import { useState, useEffect, useContext } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { addTask } from "../../firebase/taskService";
import { addReward } from "../../firebase/rewardService";
import { userContext } from "../../utils/userContext";
import "./popup.css";

function Popup_Form(props) {
  const onClose = props.onClose;
  const path = props.path;
  const currUser = useContext(userContext);

  const [newTitle, setNewTitle] = useState("");
  const [newPoint, setNewPoint] = useState(0);
  const [newComment, setNewComment] = useState("");

  console.log("Popup_Form user: ", currUser);

  return (
    <Modal show={props.show} onHide={onClose}>
      {/* <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header> */}
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
                setNewPoint(event.target.value);
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
          {/* <Form.Group controlId="popupForm.genre">
            <Form.Label>Genre</Form.Label>
            <Form.Control as="select">
              {props.genres.map((g) => (
                <option key={g.id}>{g.name}</option>
              ))}
            </Form.Control>
          </Form.Group> */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="success"
          onClick={
            path === "tasks"
              ? () =>
                  addTask({
                    newTitle,
                    newPoint,
                    newComment,
                    currUser,
                    onClose,
                  })
              : addReward
          }
          // newName={newTitle}
          // newPoint={newPoint}
          // newComment={newComment}
          // currUser={currUser}
        >
          Add!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Popup_Form;
