import React from 'react';
import './CardLeft.css';
import * as Img from '../index';
import heart from '../../assets/heart.svg';

function CardLeft({ onSelect, isActive, cardNumber, type }) {
    let imageUrl;
    
    switch(type) {
        case 'cards':
            imageUrl = Img[`img${cardNumber}`];
            break;
        case 'ducks':
            imageUrl = `https://random-d.uk/api/${cardNumber}.jpg`;
    }

    return (
        <div id={"left" + (isActive ? "active" : "")} className="card" onClick={onSelect}>
            <div className="card__image__container">
                <img className="card__image" alt="Card" src={imageUrl} />
            </div>
            <div className="heart__frame">
                <img className="heart__image" alt="Heart" src={heart} />
            </div>
        </div>
    );
}

export default CardLeft;
