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
import Loader from "../../components/loader/Loader";
import FinishedGamePage from "../finished-game/FinishedGamePage";

function GamePage() {
    const [ selectedCard, setSelectedCard ] = useState(0);
    const [ cardPair, setCardPair ] = useState([0, 1]);
    const [ finishedGame, setFinishedGame ] = useState('off');
    const [ gamePlayed, setGamePlayed ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isActiveLeft, setIsActiveLeft ] = useState(false);
    const [ isActiveRight, setIsActiveRight ] = useState(false);
    const [ monkeys, setMonkeys ] = useState([]);
    const [ counter, setCounter ] = useState(0);

    // Gets cards from firebase
    let getMonkeys = () => {
        const monkeyRef = ref(database, '/cards');

        onValue(monkeyRef, (snapshot) => {
            const data = snapshot.val();
            const newMonkeys = Object.values(data); // Get values from db

            setMonkeys(newMonkeys); // Set new state for monkeys

            setIsLoading(false);
            console.log(newMonkeys); // Output new values
        });
    };

    // Update points in MONKEYS
    let updatePoints = (cardIndex) => {
        // Save MONKEYS to firebase
        const monkeyRef = ref(database, 'cards/' + cardIndex);

        update(monkeyRef, {
            "points": monkeys[cardIndex].points += 100
        });
    };

    const handleClick = (cardIndex) => {
        // Generate a new pair of random cards
        const idx1 = Math.floor(Math.random() * monkeys.length);
        const idx2 = Math.floor(Math.random() * monkeys.length);

        if (cardIndex === cardPair[0]) {
            setIsActiveLeft(true);
        } else {
            setIsActiveRight(true);
        }

        setCounter(prevState => prevState + 1);
        if(counter === 10) {
            setFinishedGame('on');
        }

        setTimeout(() => {
            setCardPair([idx1, idx2]);
            console.log(`New card pair ${cardPair}`);

            setIsActiveLeft(false);
            setIsActiveRight(false);
        }, 1000);
    };

    // Changes selectedCard to the card selected by the user
    let selectHandle = (cardIndex) => {
        if (gamePlayed) {
            return;
        }

        updatePoints(cardIndex);
        setSelectedCard(cardIndex);
        console.log(`Selected card ${selectedCard}`);

        handleClick(cardIndex);
    };

    // Game state changing
    useEffect(() => {
        if (finishedGame === 'on') {
            console.log("Игра закончена");
            /*navigate('/game-end');*/

            setGamePlayed(true);
        }
    }, [finishedGame]);

    useEffect(() => {
        getMonkeys();
    }, []);

    if (isLoading) {
        return (
            <div className="loader__container">
                <Loader />
            </div>
        );
    }

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
                                <div className="button__container">
                                    <div className="button__frame">
                                        <div className="stats">
                                            <p className="num__card">{counter}</p>
                                            <p className="sum__card">/10</p>
                                        </div>
                                    </div>
                                </div>
                                <StatsButton monkeys={monkeys} />
                            </div>
                        </div>
                        <div className='cards__frame'>
                            <CardLeft onSelect={() => selectHandle(cardPair[0])}
                                      isActive={isActiveLeft}
                                      cardNumber={monkeys[cardPair[0]].card_PK} />
                            <CardRight onSelect={() => selectHandle(cardPair[1])}
                                       isActive={isActiveRight}
                                       cardNumber={monkeys[cardPair[1]].card_PK} />
                        </div>
                    </div>
                    <StatsMobile monkeys={monkeys} />
                </div>
            )}
            {finishedGame === 'on' && (
                <FinishedGamePage monkeys={monkeys} />
            )}
        </div>
    );
}

export default GamePage;