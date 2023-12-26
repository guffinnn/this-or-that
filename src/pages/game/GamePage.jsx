import './GamePage.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ref, onValue, update } from 'firebase/database';
import { database } from "../../firebase";
import Button from '../../components/button/Button';
import CardLeft from '../../components/card-left/CardLeft';
import CardRight from '../../components/card-right/CardRight';
import StatsButton from "../../components/statistics/StatsButton";
import StatsMobile from "../../components/stats-mobile/StatsMobile";

function GamePage() {
    const [ selectedCard, setSelectedCard ] = useState(1);
    const [ finishedGame, setFinishedGame ] = useState('off');
    const [ selectedHeader, setSelectedHeader ] = useState('home');
    const [ monkeys, setMonkeys ] = useState([0, 0, 0]);

    // Gets cards from firebase
    let getMonkeys = () => {
        const monkeyRef = ref(database, 'cards');

        onValue(monkeyRef, (snapshot) => {
            const data = snapshot.val();
            setMonkeys(data);
            console.log(monkeys);
        });
    };

    // Gets monkey favorite
    let favoriteMonkeys = id => {
        const monkey = monkeys.find(m => m.id === id);

        // increase the likes
        const monkeyRef = ref(database, `cards/${id}`);
        onValue(monkeyRef, (snapshot) => {
            const data = snapshot.val();
            data.points += 1;
            update(monkeyRef, {points: data.points});
        });

        getMonkeys();
        selectHandle();
    };

    // Gets new random cards
    let getRandomMonkeys = () => {
        if (!monkeys) {
            return;
        }

        const idx1 = Math.floor(Math.random() * monkeys.length);
        const idx2 = Math.floor(Math.random() * monkeys.length);

        setSelectedCard(idx1);
        setSelectedCard(idx2);
    };

    // Changes selectedCard to next card (index + 2)
    let selectHandle = () => {
        getMonkeys();
        setSelectedCard(prevState => {
            let newValue = prevState + 2;
            if (newValue > monkeys.length) {
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
