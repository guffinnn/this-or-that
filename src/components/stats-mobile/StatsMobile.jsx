import './StatsMobile.css';
import React from "react";
import LeaderCard from "../favorite-card/LeaderCard";

function StatsMobile({ monkeys }) {
    return (
        <div className="statistics__frame" id="mobile">
            <div className="heading__stats">
                <h3 className="heading">Таблица лидеров</h3>
            </div>
            <div className="stats__mainframe">
                {monkeys
                    .sort((a, b) => b.points - a.points)
                    .slice(0, 5)
                    .map((monkey, idx) => (
                        <LeaderCard index={idx} {...monkey} />
                    ))}
            </div>
        </div>
    );
}

export default StatsMobile;
