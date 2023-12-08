import './CardLeft.css';
import * as Img from '../index';
import heart from '../../assets/heart.svg';

function CardLeft() {
    return (
        <div id="left" className="card">
            <img className="card__image" alt="Card" src={Img["img1"]} />
            <div className="heart__frame">
                <img className="heart__image" alt="Heart" src={heart} />
            </div>
        </div>
    );
}

export default CardLeft;
