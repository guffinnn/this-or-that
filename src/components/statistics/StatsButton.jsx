import './StatsButton.css';
import stats from '../../assets/stats.svg';
import LeaderCard from "../favorite-card/LeaderCard";

function StatsButton() {
    return (
        <div className="statistics">
            <div className="stats__button__frame">
                <img className="svg" alt="Button" src={stats} width="29" />
            </div>
            <div className="statistics__frame">
                <div className="heading__stats">
                    <h3 className="heading">Таблица лидеров</h3>
                </div>
                <div className="stats__mainframe">
                    <LeaderCard />
                </div>
            </div>
        </div>
    );
}

export default StatsButton;
