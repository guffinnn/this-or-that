import React, {useState} from "react";
import {Link} from "react-router-dom";
import Block from "../../components/block/Block";
import StatsMobile from "../../components/stats-mobile/StatsMobile";

function FinishedGamePage({ monkeys, type }) {
    const [ selectedHeader, setSelectedHeader ] = useState('home');

    let sectionSelected = (headerSection) => {
        setSelectedHeader(headerSection);
    };

    return (
        <div className='container__game frame__finished'>
            <div className='container__fluid__game'>
                <header>
                    <h1 className='head__game finished'>Игра окончена!</h1>
                    <div className="header__biocad">
                        {selectedHeader === 'home' && (
                            <div className="header__menu">
                                <div className="menu__dash active__frame" onClick={() => sectionSelected('home')}>
                                    <p className="menu__text active__text">Главная</p>
                                </div>
                                <div className="menu__analytics default__frame" onClick={() => sectionSelected('stats')}>
                                    <p className="menu__text default__text">Статистика</p>
                                </div>
                            </div>
                        )}
                        {selectedHeader === 'stats' && (
                            <div className="header__menu">
                                <div className="menu__dash default__frame" onClick={() => sectionSelected('home')}>
                                    <p className="menu__text default__text">Главная</p>
                                </div>
                                <div className="menu__analytics active__frame" onClick={() => sectionSelected('stats')}>
                                    <p className="menu__text active__text">Статистика</p>
                                </div>
                            </div>
                        )}
                    </div>
                </header>
                <div className="main__of__biocad">
                    {selectedHeader === 'home' && (
                        <div className="collection__frame" id="collections">
                            <Link to={'/game/monkeys'}>
                                <Block name={'monkeys'} />
                            </Link>
                            <Link to={'/game/ducks'}>
                                <Block name={'ducks'} />
                            </Link>
                            <Block name={''} />
                            <Block name={''} />
                            <Block name={''} />
                            <Block name={''} />
                        </div>
                    )}
                    {selectedHeader === 'stats' && (
                        <div id="collections">
                            <StatsMobile monkeys={monkeys}
                                         type={type}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FinishedGamePage;