import './CardRight.css';
import * as Img from '../index';
import heart from '../../assets/heart.svg';
import React from "react";

function CardRight({ onSelect, isActive, cardNumber }) {
    return (
        <div id={"right" + (isActive ? "active" : "")} className="card" onClick={onSelect}>
            <div className="card__image__container">
                <img className="card__image" alt="Card" src={Img[`img${cardNumber}`]} />
            </div>
            <div className="heart__frame">
                <img className="heart__image" alt="Heart" src={heart} />
            </div>
        </div>
    );
}

export default CardRight;