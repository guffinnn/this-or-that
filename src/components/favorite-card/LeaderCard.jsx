import './LeaderCard.css';
import React, {useEffect, useState} from "react";
import {Transition} from 'react-transition-group';
import * as Img from '../index';

function LeaderCard({index, card_PK, name, points, type}) {
    const [currentPoints, setCurrentPoints] = useState(points);
    const [inProp, setInProp] = useState(false);

    useEffect(() => {
        if (points !== currentPoints) {
            setCurrentPoints(points);
            setInProp(true);
        }
    }, [points]);

    const defaultStyle = {
        transition: `opacity 500ms ease-in-out`,
        opacity: 0,
        color: '#5BD57A',
    }

    const transitionStyles = {
        entering: { opacity: 1 },
        entered:  { opacity: 1 },
        exiting:  { opacity: 0 },
        exited:  { opacity: 0 },
    };

    let imageUrl;

    switch(type) {
        case 'cards':
            imageUrl = Img[`img${card_PK}`];
            break;
        case 'ducks':
            imageUrl = `https://random-d.uk/api/${card_PK}.jpg`;
    }

    return (
        <div className="leader__card__frame">
            <p className="cards__number">{index + 1}</p>
            <div className="card__image__leaderboard">
                <img className={`leader__image number__${index + 1}`} alt="Monkey" src={imageUrl} />
            </div>
            <div className="card__info__frame">
                <p className="cards__name">{name}</p>
                <p className="cards__points">Счет: {points}
                    <Transition in={inProp} timeout={500} onEntered={() => setInProp(false)}>
                        {state => (
                            <span className="point__text" style={{
                                ...defaultStyle,
                                ...transitionStyles[state]
                            }}>
                                +100
                            </span>
                        )}
                    </Transition>
                </p>
            </div>
        </div>
    );
}

export default LeaderCard;
