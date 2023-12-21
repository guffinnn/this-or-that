import './GamePage.css';
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc } from '@firebase/firestore';
import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';
import CardLeft from '../../components/card-left/CardLeft';
import CardRight from '../../components/card-right/CardRight';
import StatsButton from "../../components/statistics/StatsButton";
import StatsMobile from "../../components/stats-mobile/StatsMobile";

function GamePage() {
    const [monkeys, setMonkeys] = useState([]);
    const [name, setName] = useState('');
    const [points, setPoints] = useState(0);
    const monkeysRef = collection(db, 'monkeys');

    useEffect(() => {
        const getMonkeysData = async () => {
            const data = await getDocs(monkeysRef);
            console.log(data);
            setMonkeys(data.docs.map((elem) => ({...elem.data(), id: elem.id})));
        }

        /*getMonkeysData();*/
    }, []);

    return (
        <div className='container__game'>
            <div className='container__fluid__game'>
                <div className='main__frame__game'>
                    <div className='header'>
                        <div className='heading__frame__game'>
                            <h1 className='head__game'>Голосование</h1>
                            <p className='text'>выбери один из вариантов</p>
                        </div>
                        <div className='navigation__frame__game'>
                            <Link to={'/this-or-that'}>
                                <Button />
                            </Link>
                            <StatsButton />
                        </div>
                    </div>
                    <div className='cards__frame'>
                        <CardLeft />
                        <CardRight />
                    </div>
                </div>
                <StatsMobile />
            </div>
        </div>
    );
}

export default GamePage;
