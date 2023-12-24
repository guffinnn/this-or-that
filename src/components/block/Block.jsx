import img from '../../assets/img.png';
import './Block.css';

function Block({name}) {
    return (
        <div className="block__frame">
            <div className="content">
                <div className="status">
                    <p className="status__text">Новинка</p>
                </div>
                <div className="main__of__content">
                    <div className="info__frame">
                        <p className="heading__info">{name === 'monkeys' && 'Эта или та обезьяна?'}</p>
                        <p className="text__info">Выбери своего фаворита!</p>
                    </div>
                    <img className="image__block" alt="Card" src={img} width="100"/>
                </div>
            </div>
        </div>
    );
}

export default Block;
