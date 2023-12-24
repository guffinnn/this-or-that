import './GamePage.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
/*import { ref, onValue } from 'firebase/database';
import { database } from "../../firebase";*/
import Button from '../../components/button/Button';
import CardLeft from '../../components/card-left/CardLeft';
import CardRight from '../../components/card-right/CardRight';
import StatsButton from "../../components/statistics/StatsButton";
import StatsMobile from "../../components/stats-mobile/StatsMobile";

/*const starCountRef = ref(database, 'posts/' + postId + '/starCount');
onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
});*/

function GamePage() {
    const [ selectedCard, setSelectedCard ] = useState(1);
    const [ finishedGame, setFinishedGame ] = useState('off');
    const [ selectedHeader, setSelectedHeader ] = useState('home');
    const [ monkeys, setMonkeys ] = useState([]);

    // Change selectedCard to next card (index + 2)
    let selectHandle = () => {
        setSelectedCard(prevState => {
            let newValue = prevState + 2;
            if (newValue > 23) {
                setFinishedGame('on');
                console.log(finishedGame);
            }
            return newValue;
        });
        console.log(selectedCard);
    };

    // Game state changing
    useEffect(() => {
        if (finishedGame === 'on') {
            console.log("Игра закончена");
        }
    }, [finishedGame]);

    let sectionSelected = (headerSection) => {
        setSelectedHeader(headerSection);
    };

    return (
        <div className='container__game'>
            {finishedGame === 'off' && (
                <div className='container__fluid__game'>
                    <div className='main__frame__game'>
                        <div className='header'>
                            <div className='heading__frame__game'>
                                <h1 className='head__game'>Голосование</h1>
                                <p className='text'>выбери один из вариантов</p>
                            </div>
                            <div className='navigation__frame__game'>
                                <Link to={'/this-or-that'}>
                                    <div className="button__container">
                                        <Button />
                                    </div>
                                </Link>
                                <StatsButton />
                            </div>
                        </div>
                        <div className='cards__frame'>
                            <CardLeft onSelect={() => selectHandle()} cardNumber={selectedCard} />
                            <CardRight onSelect={() => selectHandle()} cardNumber={selectedCard + 1} />
                        </div>
                    </div>
                    <StatsMobile />
                </div>
            )}
            {finishedGame === 'on' && (
                <div className='container__fluid__game'>
                    <header>
                        <h1 className='head__game finished'>Игра окончена!</h1>
                        <div className="header__biocad">
                            {selectedHeader === 'home' && (
                                <div className="header__menu">
                                    <div className="menu__dash active__frame" onClick={() => sectionSelected('home')}>
                                        <p className="menu__text active__text">Главная</p>
                                    </div>
                                    <div className="menu__analytics default__frame" onClick={() => sectionSelected('stats')}>
                                        <p className="menu__text default__text">Статистика</p>
                                    </div>
                                </div>
                            )}
                            {selectedHeader === 'stats' && (
                                <div className="header__menu">
                                    <div className="menu__dash default__frame" onClick={() => sectionSelected('home')}>
                                        <p className="menu__text default__text">Главная</p>
                                    </div>
                                    <div className="menu__analytics active__frame" onClick={() => sectionSelected('stats')}>
                                        <p className="menu__text active__text">Статистика</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </header>
                    <div className="main__of__biocad">
                        {selectedHeader === 'home' && (
                            <div className="collection__frame" id="collections">
                                /*

                                 Collections of cards
                                 if collections.isEmpty():
                                    output CardCollections isEmpty

                                 */
                            </div>
                        )}
                        {selectedHeader === 'stats' && (
                            <div id="collections">
                                <StatsMobile />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default GamePage;
