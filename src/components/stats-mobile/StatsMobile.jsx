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
                <LeaderCard {...MONKEYS[0]} />
                <LeaderCard {...MONKEYS[1]} />
                <LeaderCard {...MONKEYS[2]} />
                <LeaderCard {...MONKEYS[3]} />
                <LeaderCard {...MONKEYS[4]} />
            </div>
        </div>
    );
}

export default StatsMobile;
