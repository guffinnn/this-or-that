import './HomePage.css';
import Button from "../../components/button/Button";
import Block from "../../components/block/Block";

function HomePage() {
    return (
        <div className="container">
            <div className="container__fluid">
                <div className="navigation__frame">
                    <Button />
                </div>
                <div className="main__frame">
                    <div className="heading__frame">
                        <h1>Главная</h1>
                        <p className="text">Выберите подборку карточек</p>
                    </div>
                    <div className="collection__frame">
                        <Block />
                        <Block />
                        <Block />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
