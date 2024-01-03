import './Button.css';

function Button({ name }) {
    return (
        <div>
            {name==='user' && (
                <div className="button__frame">
                    <div className="svg__user"></div>
                </div>
            ) || (
                <div className="button__frame">
                    <div className="svg__home"></div>
                </div>
            )}
        </div>
    );
}

export default Button;
