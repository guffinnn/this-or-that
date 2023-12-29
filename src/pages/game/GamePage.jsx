import './GamePage.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ref, onValue, update } from 'firebase/database';
import { database } from "../../firebase";
import { MONKEYS } from "../../components";
import Button from '../../components/button/Button';
import CardLeft from '../../components/card-left/CardLeft';
import CardRight from '../../components/card-right/CardRight';
import StatsButton from "../../components/statistics/StatsButton";
import StatsMobile from "../../components/stats-mobile/StatsMobile";
import Loader from "../../components/loader/Loader";

function GamePage() {
    const [ selectedCard, setSelectedCard ] = useState(0);
    const [ cardPair, setCardPair ] = useState([0, 1]);
    const [ finishedGame, setFinishedGame ] = useState('off');
    const [ gamePlayed, setGamePlayed ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);
    const [isActiveLeft, setIsActiveLeft] = useState(false);
    const [isActiveRight, setIsActiveRight] = useState(false);

    // Gets cards from firebase
    let getMonkeys = () => {
        const monkeyRef = ref(database, '/cards');

        onValue(monkeyRef, (snapshot) => {
            const data = snapshot.val();

            //
            // Bug - duplicates some monkeys from firebase to MONKEYS
            //
            /*Object.keys(data).forEach(key => {
                MONKEYS.push(data[key]);
            });*/

            setIsLoading(false);
            console.log(MONKEYS);
        });
    };

    // Update points in MONKEYS
    let updatePoints = (cardIndex) => {
        // Save MONKEYS to firebase
        const monkeyRef = ref(database, 'cards/' + cardIndex);

        update(monkeyRef, {
            "points": MONKEYS[cardIndex].points += 100
        });
    };

    const handleClick = (cardIndex) => {
        // Generate a new pair of random cards
        const idx1 = Math.floor(Math.random() * MONKEYS.length);
        const idx2 = Math.floor(Math.random() * MONKEYS.length);

        if (cardIndex === cardPair[0]) {
            setIsActiveLeft(true);
        } else {
            setIsActiveRight(true);
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

    let navigate = useNavigate();

    // Game state changing
    useEffect(() => {
        if (finishedGame === 'on') {
            console.log("Игра закончена");
            navigate('/game-end');

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
                                <StatsButton />
                            </div>
                        </div>
                        <div className='cards__frame'>
                            <CardLeft onSelect={() => selectHandle(cardPair[0])}
                                      isActive={isActiveLeft}
                                      cardNumber={MONKEYS[cardPair[0]].card_PK} />
                            <CardRight onSelect={() => selectHandle(cardPair[1])}
                                       isActive={isActiveRight}
                                       cardNumber={MONKEYS[cardPair[1]].card_PK} />
                        </div>
                    </div>
                    <StatsMobile />
                </div>
            )}
        </div>
    );
}

export default GamePage;