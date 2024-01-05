import './Burger.css';
import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Button from "../button/Button";

function Burger({ count }) {
    const [isStatsVisible, setStatsVisible] = useState(true);

    // Click Listener for stats__button__frame
    const handleClick = () => {
        setStatsVisible(!isStatsVisible);
    };

    return (
        <div className="burger">
            <div className="button__container">
                <div className="button__frame" onClick={handleClick}>
                    <div className="svg__burger"></div>
                </div>
            </div>
            <div className={`burger__container ${isStatsVisible ? 'close' : 'open'}`}>
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
                            <p className="num__card">{count}</p>
                            <p className="sum__card">/10</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Burger;
