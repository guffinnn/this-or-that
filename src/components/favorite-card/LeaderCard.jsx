import './LeaderCard.css';
import * as Img from '../index';

function LeaderCard({index, name, points}) {
    return (
        <div className="leader__card__frame">
            <p className="cards__number">{index}</p>
            <div className="card__image__leaderboard">
                <img className="leader__image" alt="Monkey" src={Img[`img${index}`]} />
            </div>
            <div className="card__info__frame">
                <p className="cards__name">{name}</p>
                <p className="cards__points">Счет: <span className="point__text">{points}</span></p>
            </div>
        </div>
    );
}

export default LeaderCard;
