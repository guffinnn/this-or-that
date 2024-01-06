import './HomePage.css';
import {Link} from 'react-router-dom';
import Button from "../../components/button/Button";
import Block from "../../components/block/Block";

function HomePage() {
    return (
        <div className="container">
            <div className="container__fluid">
                <div className="navigation__frame">
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
                </div>
                <div className="main__frame">
                    <div className="heading__frame">
                        <h1>Главная</h1>
                        <p className="text">Выберите подборку карточек</p>
                    </div>
                    <div className="collection__frame">
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
                </div>
            </div>
        </div>
    );
}

export default HomePage;
