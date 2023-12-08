import './GamePage.css';
import Button from "../../components/button/Button";
import CardLeft from "../../components/card-left/CardLeft";
import CardRight from "../../components/card-right/CardRight";

function GamePage() {
    return (
        <div className="container">
            <div className="container__fluid">
                <div className="navigation__frame">
                    <Button />
                </div>
                <div className="main__frame">
                    <div className="heading__frame">
                        <h1>Голосование</h1>
                        <p className="text">выбери один из вариантов</p>
                    </div>
                    <div className="cards__frame">
                        <CardLeft />
                        <CardRight />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GamePage;
