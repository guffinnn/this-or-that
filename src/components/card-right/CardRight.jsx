import './CardRight.css';
import * as Img from '../index';
import heart from '../../assets/heart.svg';

function CardRight() {
    return (
        <div id="right" className="card">
            <img className="card__image" alt="Card" src={Img["img2"]} />
            <div className="heart__frame">
                <img className="heart__image" alt="Heart" src={heart} />
            </div>
        </div>
    );
}

export default CardRight;
