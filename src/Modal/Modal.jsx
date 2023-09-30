import "./Modal.css";

const Modal = ({ wonAmount, lostAmount }) => {
  return (
    <div className="modal">
      <h1 className="modal-content">you won ${wonAmount}</h1>
      <h3 className="modal-content">you lost ${lostAmount}</h3>
      <div className="modal-footer"></div>
    </div>
  );
};

export default Modal;
