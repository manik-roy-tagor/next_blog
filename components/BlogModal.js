import { Modal, Button } from 'react-bootstrap';

const BlogModal = ({ show, handleClose, blog }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{blog.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{blog.content}</p>
        <h4>Comments</h4>
        {blog.comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.user}: {comment.text}</p>
            <button>Reply</button>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BlogModal;
