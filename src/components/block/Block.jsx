import './Block.css';
import React from "react";
import img from '../../assets/img.png';
import * as Img from '../index';

function Block({name}) {
    return (
        <div className="block__frame">
            <div className="content">
                <div className={`status ${(name === 'monkeys' && '') || (name === '' && 'moderate')}`}>
                    <p className='status__text'>
                        {(name === 'monkeys' && 'Новинка') || (name === '' && 'На проверке')}
                    </p>
                </div>
                <div className="main__of__content">
                    <div className="info__frame">
                        <p className="heading__info">
                            {`This or that: ${(name === 'monkeys' && 'Обезьяны') || (name === '' && 'Coming soon...')}`}
                        </p>
                        <p className="text__info">Выбери своего фаворита!</p>
                    </div>
                    <img className="image__block" alt="Card" src={(name === 'monkeys' && Img["img1"]) || (name === '' && img)} width="100"/>
                </div>
            </div>
        </div>
    );
}

export default Block;
