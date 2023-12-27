import './GamePage.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ref, onValue, update, set } from 'firebase/database';
import { database } from "../../firebase";
import Button from '../../components/button/Button';
import CardLeft from '../../components/card-left/CardLeft';
import CardRight from '../../components/card-right/CardRight';
import StatsButton from "../../components/statistics/StatsButton";
import StatsMobile from "../../components/stats-mobile/StatsMobile";
import { MONKEYS } from "../../components";

function GamePage() {
    const [ selectedCard, setSelectedCard ] = useState(1);
    const [ finishedGame, setFinishedGame ] = useState('off');
    const [ monkeys, setMonkeys ] = useState(MONKEYS);

    // Gets cards from firebase
    let getMonkeys = () => {
        const monkeyRef = ref(database, '/cards');

        onValue(monkeyRef, (snapshot) => {
            const data = snapshot.val();
            setMonkeys(data);
            console.log(monkeys);
        });
    };

    // Update points in MONKEYS
    let updatePoints = (cardIndex) => {
        MONKEYS[cardIndex - 1].points += 100;
    };

    // Changes selectedCard to next card (index + 2)
    let selectHandle = (cardIndex) => {
        getMonkeys();
        updatePoints(cardIndex);
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

    let navigate = useNavigate();

    // Game state changing
    useEffect(() => {
        if (finishedGame === 'on') {
            console.log("Игра закончена");
            navigate('/game-end');

            // Save MONKEYS to firebase
            const monkeyRef = ref(database, 'cards');
            set(monkeyRef, MONKEYS);
        }
    }, [finishedGame]);

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
                            <CardLeft onSelect={() => selectHandle(selectedCard)} cardNumber={selectedCard} />
                            <CardRight onSelect={() => selectHandle(selectedCard + 1)} cardNumber={selectedCard + 1} />
                        </div>
                    </div>
                    <StatsMobile />
                </div>
            )}
        </div>
    );
}

export default GamePage;
