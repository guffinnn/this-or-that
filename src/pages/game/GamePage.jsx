import {Component} from 'react';
import './GamePage.css';
import Button from '../../components/button/Button';
import CardLeft from '../../components/card-left/CardLeft';
import CardRight from '../../components/card-right/CardRight';
import { Link } from 'react-router-dom';

import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import '../../firebase';

class GamePage extends Component {
    componentDidMount = () => {
        const database = firebase.database().ref('/cards');
        console.log(database);
    };

    render() {
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
                            </div>
                        </div>
                        <div className='cards__frame'>
                            <CardLeft />
                            <CardRight />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GamePage;
