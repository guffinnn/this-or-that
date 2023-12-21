import React, { useState } from 'react';
import './StatsButton.css';
import stats from '../../assets/stats.svg';
import { MONKEYS } from '../index';
import LeaderCard from "../favorite-card/LeaderCard";

function StatsButton() {
    const [isStatsVisible, setStatsVisible] = useState(true);

    // Click Listener for stats__button__frame
    const handleClick = () => {
        setStatsVisible(!isStatsVisible);
    };

    return (
        <div className="statistics">
            <div className="stats__button__frame" onClick={handleClick}>
                <img className="svg" alt="Button" src={stats} width="24" />
            </div>
            <div className={`statistics__frame ${isStatsVisible ? 'open' : 'close'}`}>
                <div className="heading__stats">
                    <h3 className="heading">Таблица лидеров</h3>
                </div>
                <div className="stats__mainframe">
                    <LeaderCard {...MONKEYS[0]} />
                    <LeaderCard {...MONKEYS[1]} />
                    <LeaderCard {...MONKEYS[2]} />
                    <LeaderCard {...MONKEYS[3]} />
                    <LeaderCard {...MONKEYS[4]} />
                </div>
            </div>
        </div>
    );
}

export default StatsButton;
