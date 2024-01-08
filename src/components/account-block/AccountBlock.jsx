import img from "../../assets/img.png";
import completeDuck from "../../assets/complete-duck.png";
import completeMonkey from "../../assets/complete-monkey.png";
import React from "react";

function AccountBlock({name, date}) {
    let imageUrl;

    switch(name) {
        case 'cards':
            imageUrl = completeMonkey;
            break;
        case 'ducks':
            imageUrl = completeDuck;
    }

    return (
        <div className={`block__frame block__frame__${((name === 'cards' || name === 'ducks') && 'ready') || (name === '' && 'moderate')}`}>
            <div className="content">
                <div className={`status ${((name === 'cards' || name === 'ducks') && '') || (name === '' && 'moderate')}`}>
                    <p className='status__text'>Пройдено</p>
                </div>
                <div className="main__of__content">
                    <div className="info__frame">
                        <p className="heading__info">
                            {`This or that: ${(name === 'cards' && 'Обезьяны') || (name === 'ducks' && 'Утки') || (name === '' && 'Coming soon...')}`}
                        </p>
                        <p className="text__info">⏰ {date}</p>
                    </div>
                    <img className="image__block" alt="Card" src={(name !== '' && imageUrl) || (name === '' && img)} width="100"/>
                </div>
            </div>
        </div>
    );
}

export default AccountBlock;