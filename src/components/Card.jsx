import React, { useState } from "react";
import PropTypes from "prop-types";

import "./Card.scss";
import { connect } from "react-redux";
import { setShowModal } from "../state";

const mapStateToProps = (state) => {
  return {
    modal: state.modal
  }
}

const Card = connect(mapStateToProps, {setShowModal})(({good, setShowModal, updateList}) => {
    const [toFavorite, setToFavorite] = useState(false)

    const deleteAndAddToFavorites = (e) => {
      e.preventDefault();

      setToFavorite(!toFavorite)
      if(!!updateList) updateList((prev) => !prev)

      if (localStorage.getItem(`toFavorite-id${good.id}`)) {
        localStorage.removeItem(`toFavorite-id${good.id}`);
        return
      }
      
      localStorage.setItem(`toFavorite-id${good.id}`, true);

    }

    return (
      <li className="good">
        <div className="good-img">
          <img src={good.url} alt="good" />
        </div>
        <h3 className="good-title">{good.name}</h3>
        <div className="favorites-and-color-place">
          <a
            href="#"
            className={

              localStorage.getItem(`toFavorite-id${good.id}`) !== null
                ? "favorite-btn active"
                : "favorite-btn"

            }
            onClick={deleteAndAddToFavorites}
          >
            <svg className="svg" height="25" width="23" data-rating="1">
              <polygon
                fill="grey"
                points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
                style={{ fillRull: "nonzero" }}
              />
            </svg>
          </a>
          <div
            className="good-color"
            style={{
                backgroundColor: good.color,
              }}
          ></div>
        </div>
        <p className="good-article"><b>Article:</b> {good.article}</p>
        <div className="good-change">
            <p className="good-price">${good.price}</p>
            {(localStorage.getItem(`toCart-id${good.id}`) === null) ? 
                <a href="#" className="add-btn" onClick={() => setShowModal(good.id)}>to Cart</a> : 
                <a href="#" className="remove-btn" onClick={() => setShowModal(good.id)}>X</a>
            }
        </div>
      </li>
    )
});

Card.propTypes = {
  good: PropTypes.object,
  deleteGood: PropTypes.func,
}

export default Card;