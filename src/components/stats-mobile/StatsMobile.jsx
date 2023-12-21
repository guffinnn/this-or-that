import './StatsMobile.css';
import LeaderCard from "../favorite-card/LeaderCard";

function StatsMobile() {
    return (
        <div className="statistics__frame" id="mobile">
            <div className="heading__stats">
                <h3 className="heading">Таблица лидеров</h3>
            </div>
            <div className="stats__mainframe">
                <LeaderCard index="1" name="Банановый герой" points={10000} />
                <LeaderCard index="2" name="Пушистый шалун" points={5700} />
                <LeaderCard index="3" name="Кокосовый бешенец" points={4300} />
                <LeaderCard index="4" name="Веселая хвостатая" points={2700} />
                <LeaderCard index="5" name="Смешной кулик" points={2000} />
            </div>
        </div>
    );
}

export default StatsMobile;
