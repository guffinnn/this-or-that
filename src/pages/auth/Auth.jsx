import './Auth.css';
import React, {useEffect, useState} from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {auth, database} from "../../firebase";
import {onValue, ref} from 'firebase/database';
import {Link} from "react-router-dom";
import Button from "../../components/button/Button";
import AccountBlock from "../../components/account-block/AccountBlock";

function Auth() {
    const [user, setUser] = useState({});
    const [name, setName] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState(0);
    const [sessionDate, setSessionDate] = useState([]);
    const [loginDate, setLoginDate] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                getGameData(user.uid);
                const creationTime = new Date(user.metadata.creationTime);
                setLoginDate(creationTime);
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, []);

    const register = async (e) => {
        e.preventDefault();
        try {
            const user = createUserWithEmailAndPassword(auth, login, password)
        } catch(error) {
            console.log(error.message);
        }
    }

    const logIn = async (e) => {
        e.preventDefault();
        try {
            const user = await signInWithEmailAndPassword(auth, login, password);
        } catch (error) {
            console.log(error.message);
        }
    }

    const signIn = async (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error(error);
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    };

    // Get a date info from firebase
    function getGameData(userId) {
        const gameRef = ref(database, `/games/${userId}`);

        onValue(gameRef, (snapshot) => {
            const data = snapshot.val();
            const gameData = Object.entries(data);
            setSessionDate(gameData);
        });
    }

    return (
        <div className="container">
            <div className="container__fluid auth__container">
                {user ? (
                    <div className="container__fluid">
                        <div className="navigation__frame">
                            <Link to={'/this-or-that'}>
                                <div className="button__container">
                                    <Button />
                                </div>
                            </Link>
                            <Link to={'/auth'}>
                                <div className="button__container">
                                    <Button name='user' />
                                </div>
                            </Link>
                        </div>
                        <div className="main__frame">
                            <div className="heading__frame">
                                <h1>Личный кабинет</h1>
                                <p className="text">Информация о игроке</p>
                            </div>
                            <div className="collection__frame">
                                <div className="block__frame">
                                    <div className="content">
                                        <div className="main__of__content">
                                            <div className="info__frame">
                                                <p className="text__info">Электронная почта</p>
                                                <p className="heading__info">
                                                    {user?.email}
                                                </p>
                                                <button className="register__button" onClick={logOut}>Выйти</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="block__frame">
                                    <div className="content">
                                        <div className="main__of__content">
                                            <div className="info__frame">
                                                <p className="text__info">Дата создания аккаунта</p>
                                                <p className="heading__info">
                                                    {loginDate.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="collection__frame">
                                {sessionDate.map((game, index) =>
                                    <AccountBlock key={index}
                                                  name={game[0]}
                                                  date={game[1]} />
                                )}
                            </div>
                        </div>
                    </div>
                ) : ( status===0 && (
                    <form>
                        <div className="form__title">
                            <h2 className="auth__title">Регистрация</h2>
                            <p className="text__modal">Введите данные</p>
                        </div>
                        <div className="form__main">
                            <label htmlFor="name">Имя*</label>
                            <input id="name"
                                   type="text"
                                   placeholder="Имя"
                                   onChange={(e) => {
                                       setName(e.target.value)
                                   }}
                            />
                            <label htmlFor="mail">Почта*</label>
                            <input id="mail"
                                   type="text"
                                   placeholder="Почта"
                                   onChange={(e) => {
                                       setLogin(e.target.value)
                                   }}
                            />
                            <label htmlFor="pass">Пароль*</label>
                            <input id="pass"
                                   type="text"
                                   placeholder="Пароль"
                                   onChange={(e) => {
                                       setPassword(e.target.value)
                                   }}
                            />
                            <button className="register__button" onClick={e => register(e)}>Войти в аккаунт</button>
                            <button className="google__button" onClick={e => signIn(e)}>Войти с Google</button>
                            <div className="form__footer">
                                <p className="form__footer__text">Уже есть аккаунт?</p>
                                <a className="form__footer__link" onClick={() => setStatus(1)}>Авторизоваться</a>
                            </div>
                        </div>
                    </form>
                ) || status===1 && (
                    <form>
                        <div className="form__title">
                            <h2 className="auth__title">Авторизация</h2>
                            <p className="text__modal">Введите данные</p>
                        </div>
                        <div className="form__main">
                            <label htmlFor="mail">Почта*</label>
                            <input id="mail"
                                   type="text"
                                   placeholder="Почта"
                                   onChange={(e) => {
                                       setLogin(e.target.value)
                                   }}
                            />
                            <label htmlFor="pass">Пароль*</label>
                            <input id="pass"
                                   type="text"
                                   placeholder="Пароль"
                                   onChange={(e) => {
                                       setPassword(e.target.value)
                                   }}
                            />
                            <button className="register__button" onClick={e => logIn(e)}>Войти в аккаунт</button>
                            <button className="google__button" onClick={e => signIn(e)}>Войти с Google</button>
                            <div className="form__footer">
                                <p className="form__footer__text">Еще нет аккаунта?</p>
                                <a className="form__footer__link" onClick={() => setStatus(0)}>Зарегистрироваться</a>
                            </div>
                        </div>
                    </form>
                ))}
            </div>
        </div>
    );
}

export default Auth;