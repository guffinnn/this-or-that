import './CardLeft.css';
import * as Img from '../index';
import heart from '../../assets/heart.svg';

function CardLeft({onSelect, cardNumber}) {
    return (
        <div id="left" className="card" onClick={onSelect}>
            <img className="card__image" alt="Card" src={Img[`img${cardNumber}`]} />
            <div className="heart__frame">
                <img className="heart__image" alt="Heart" src={heart} />
            </div>
        </div>
    );
}

export default CardLeft;
