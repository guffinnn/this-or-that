import './Block.css';
import React from "react";
import img from '../../assets/img.png';
import * as Img from '../index';

function Block({name}) {
    let imageUrl;

    switch(name) {
        case 'monkeys':
            imageUrl = Img["img17"];
            break;
        case 'ducks':
            imageUrl = `https://random-d.uk/api/1.jpg`;
    }

    return (
        <div className={`block__frame block__frame__${((name === 'monkeys' || name === 'ducks') && 'ready') || (name === '' && 'moderate')}`}>
            <div className="content">
                <div className={`status ${((name === 'monkeys' || name === 'ducks') && '') || (name === '' && 'moderate')}`}>
                    <p className='status__text'>
                        {((name === 'monkeys' || name === 'ducks') && 'Новинка') || (name === '' && 'На проверке')}
                    </p>
                </div>
                <div className="main__of__content">
                    <div className="info__frame">
                        <p className="heading__info">
                            {`This or that: ${(name === 'monkeys' && 'Обезьяны') || (name === 'ducks' && 'Утки') || (name === '' && 'Coming soon...')}`}
                        </p>
                        <p className="text__info">Выбери своего фаворита!</p>
                    </div>
                    <img className="image__block" alt="Card" src={(name !== '' && imageUrl) || (name === '' && img)} width="100"/>
                </div>
            </div>
        </div>
    );
}

export default Block;
