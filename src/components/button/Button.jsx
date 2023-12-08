import home from '../../assets/home.svg';
import './Button.css';

function Button() {
    return (
        <div className="button__frame">
            <img className="svg" alt="Button" src={home} width="29" />
        </div>
    );
}

export default Button;
