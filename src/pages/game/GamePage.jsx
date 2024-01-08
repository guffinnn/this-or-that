import './GamePage.css';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {onValue, ref, update, set} from 'firebase/database';
import {auth, database} from "../../firebase";
import Button from '../../components/button/Button';
import CardLeft from '../../components/card-left/CardLeft';
import CardRight from '../../components/card-right/CardRight';
import StatsButton from "../../components/statistics/StatsButton";
import StatsMobile from "../../components/stats-mobile/StatsMobile";
import Loader from "../../components/loader/Loader";
import FinishedGamePage from "../finished-game/FinishedGamePage";
import Burger from "../../components/burger/Burger";
import {onAuthStateChanged} from "firebase/auth";

function GamePage({ cardCollection }) {
    const [ selectedCard, setSelectedCard ] = useState(0);
    const [ cardPair, setCardPair ] = useState([0, 1]);
    const [ finishedGame, setFinishedGame ] = useState('off');
    const [ gamePlayed, setGamePlayed ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isActiveLeft, setIsActiveLeft ] = useState(false);
    const [ isActiveRight, setIsActiveRight ] = useState(false);
    const [ monkeys, setMonkeys ] = useState([]);
    const [ counter, setCounter ] = useState(0);
    const [user, setUser] = useState({});

    // Gets cards from firebase
    let getMonkeys = () => {
        const monkeyRef = ref(database, `/${cardCollection}`);

        onValue(monkeyRef, (snapshot) => {
            const data = snapshot.val();
            const newMonkeys = Object.values(data); // Get values from db

            setMonkeys(newMonkeys); // Set new state for monkeys

            setIsLoading(false);
        });
    };

    // Update points in MONKEYS
    let updatePoints = (cardIndex) => {
        // Save MONKEYS to firebase
        const monkeyRef = ref(database, `/${cardCollection}/` + cardIndex);

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

    // Format date in firebase database
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Месяцы начинаются с 0 в JavaScript
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}.${month}.${year} ${hours}.${minutes}`;
    }

    // Save game stats to firebase for account page
    const saveGame = (userId, gameId) => {
        const gameRef = ref(database, `/games/${userId}/${gameId}`);
        const finishedAt = new Date().toISOString();
        set(gameRef, formatDate(finishedAt));
    };

    // Game state changing
    useEffect(() => {
        if (finishedGame === 'on') {
            console.log("Игра закончена");

            if(user) {
                saveGame(user.uid, cardCollection);
            }

            setGamePlayed(true);
        }
    }, [finishedGame]);

    useEffect(() => {
        getMonkeys();

        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
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
                                <div className="buttons__container">
                                    <Link to={'/auth'}>
                                        <div className="button__container">
                                            <Button name='user' />
                                        </div>
                                    </Link>
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
                                </div>
                                <Burger count={counter} />
                                <StatsButton monkeys={monkeys}
                                             type={cardCollection} />
                            </div>
                        </div>
                        <div className='cards__frame'>
                            <CardLeft onSelect={() => selectHandle(cardPair[0])}
                                      isActive={isActiveLeft}
                                      cardNumber={monkeys[cardPair[0]].card_PK}
                                      type={cardCollection} />
                            <CardRight onSelect={() => selectHandle(cardPair[1])}
                                       isActive={isActiveRight}
                                       cardNumber={monkeys[cardPair[1]].card_PK}
                                       type={cardCollection} />
                        </div>
                    </div>
                    <StatsMobile monkeys={monkeys}
                                 type={cardCollection} />
                </div>
            )}
            {finishedGame === 'on' && (
                <FinishedGamePage monkeys={monkeys}
                                  type={cardCollection}/>
            )}
        </div>
    );
}

export default GamePage;