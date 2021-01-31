import PropTypes from "prop-types";
import { useEffect } from "react";
import { connect } from "react-redux";
import { setHiddenModal } from "../state";

import "./Modal.scss";

const mapStateToProps = (state) => {
  return {
    goodIdToCart: state.modal.goodIdToCart
  }
}


const Modal = connect(mapStateToProps, {setHiddenModal})(({
  setHiddenModal,
  goodIdToCart
}) => {
  const status = localStorage.getItem(`toCart-id${goodIdToCart}`)
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => document.body.style.overflow = 'unset';
  },[])
  
  const deleteModal = (e) => {
    e.preventDefault()

    if (e.target.className === "modal-background" ||
        e.target.className === "btn-close" ||
        e.target.className.includes("delay")){
          setHiddenModal()
        }
  }

  const addGoodToCart = (e) => {
    e.preventDefault()

    setHiddenModal();

    if (localStorage.getItem(`toCart-id${goodIdToCart}`)) {
        localStorage.removeItem(`toCart-id${goodIdToCart}`);
        return
      }
        
    localStorage.setItem(`toCart-id${goodIdToCart}`, true);
  }

  return (
    <div>
    <div className="modal-background" onClick={deleteModal}></div>
      <div className="modal">
        <div className="modal-header">
          <p className="header-name">Do you want {!status ? "add to" : "delete from"} Cart?</p>
          <a href="#" className="btn-close" onClick={deleteModal}>X</a>
        </div>
        <div className="modal-content">
          <p className="content-text">Once you delete this file, it won’t be possible to undo this action. Are you sure you want to delete it?</p>
          <div className="btn-wrapper">
            <a href="#" className="btn accept" onClick={addGoodToCart} >Ok</a>
            <a href="#" className="btn delay" onClick={deleteModal}>Cancel</a>
          </div>
        </div>
      </div>
    </div>
  );
})

Modal.propTypes = {
  deleteModal: PropTypes.func,
  header: PropTypes.string,
  closeBtn: PropTypes.bool,
  text: PropTypes.string,
  actions: PropTypes.element,  
}

Modal.defaultProps = {
  closeBtn: true,
}

export default Modal;
