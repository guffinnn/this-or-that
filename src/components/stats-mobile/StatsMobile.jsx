import React from "react";
import './StatsMobile.css';
import { MONKEYS } from "../index";
import LeaderCard from "../favorite-card/LeaderCard";

function StatsMobile() {
    return (
        <div className="statistics__frame" id="mobile">
            <div className="heading__stats">
                <h3 className="heading">Таблица лидеров</h3>
            </div>
            <div className="stats__mainframe">
                {MONKEYS
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
