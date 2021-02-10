import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import Card from "../Card/Card";
import "./CardsPlace.scss";
import { SubmiteForm } from "../Form/Form";
import Modal from "../Modal/Modal";
import { getGoods, setShowForm } from "../../store";

const mapStateToProps = (state) => {
  return {
    goods: state.goods,
    showModal: state.modal.showModal,
    showForm: state.form.showForm,
  };
};

const CardsPlace = connect(mapStateToProps, { getGoods, setShowForm })(
  ({ goods, showModal, showForm, getGoods, setShowForm }) => {
    const [updateList, setUpdateList] = useState(false);
    const { pathname } = useLocation();
    const goodsInCart = goods.filter(
      (el) => localStorage.getItem(`toCart-id${el.id}`) !== null,
    );

    useEffect(() => {
      getGoods();
    }, [pathname]);

    return (
      <div className='cards-place'>
        {pathname == "/cart" && goodsInCart.length != 0 && (
          <div className='btn-place'>
            <button className='buy-btn' onClick={setShowForm}>
              Buy
            </button>
          </div>
        )}
        <ul className='cards-list'>
          {pathname == "/" && goods.map((el) => <Card key={el.id} good={el} />)}

          {pathname == "/favorites" &&
            goods.map((el) =>
              localStorage.getItem(`toFavorite-id${el.id}`) !== null ? (
                <Card key={el.id} good={el} updateList={setUpdateList} />
              ) : null,
            )}

          {pathname == "/cart" &&
            goodsInCart.map((el) => <Card key={el.id} good={el} />)}
        </ul>

        {showModal && <Modal />}
        {showForm && <SubmiteForm goodsInCart={goodsInCart} />}
      </div>
    );
  },
);

CardsPlace.propTypes = {
  goods: PropTypes.array,
};

export default CardsPlace;
