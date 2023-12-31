import './StatsButton.css';
import React, {useState} from 'react';
import LeaderCard from "../favorite-card/LeaderCard";

function StatsButton({ monkeys, type }) {
    const [isStatsVisible, setStatsVisible] = useState(true);

    // Click Listener for stats__button__frame
    const handleClick = () => {
        setStatsVisible(!isStatsVisible);
    };

    return (
        <div className="statistics">
            <div className="button__container">
                <div className="button__frame" onClick={handleClick}>
                    <div className="svg__stats"></div>
                </div>
            </div>
            <div className={`statistics__frame ${isStatsVisible ? 'open' : 'close'}`}>
                <div className="heading__stats">
                    <h3 className="heading">Таблица лидеров</h3>
                </div>
                <div className="stats__mainframe">
                    {monkeys
                        .sort((a, b) => b.points - a.points)
                        .slice(0, 5)
                        .map((monkey, idx) => (
                            <LeaderCard index={idx}
                                        {...monkey}
                                        type={type}/>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default StatsButton;
