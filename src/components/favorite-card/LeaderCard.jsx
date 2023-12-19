import './LeaderCard.css';
import * as Img from '../index';

function LeaderCard() {
    return (
        <div className="leader__card__frame">
            <p className="cards__number">1</p>
            <div className="card__image__leaderboard">
                <img className="leader__image" alt="Monkey" src={Img["img1"]} />
            </div>
            <div className="card__info__frame">
                <p className="cards__name">Бибизян 1</p>
                <p className="cards__points">Счет:
                    <span className="point__text">1000</span>
                </p>
            </div>
        </div>
    );
}

export default LeaderCard;
