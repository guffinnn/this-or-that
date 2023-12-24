import './HomePage.css';
import { Link } from 'react-router-dom';
import Button from "../../components/button/Button";
import Block from "../../components/block/Block";

function HomePage() {
    return (
        <div className="container">
            <div className="container__fluid">
                <div className="navigation__frame">
                    <Link to={'/this-or-that'}>
                        <Button />
                    </Link>
                </div>
                <div className="main__frame">
                    <div className="heading__frame">
                        <h1>Главная</h1>
                        <p className="text">Выберите подборку карточек</p>
                    </div>
                    <div className="collection__frame">
                        <Link to={'/game'}>
                            <Block name={'monkeys'} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
