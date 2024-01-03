import './Auth.css';
import React, {useEffect, useState} from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth';
import {auth} from "../../firebase";
import {Link} from "react-router-dom";
import Button from "../../components/button/Button";

function Auth() {
    const [user, setUser] = useState({});
    const [name, setName] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
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
            console.log(error);
        }
    }

    const logOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="container__fluid auth__container">
                {user ? (
                    <div>
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
                                <h1>Аккаунт</h1>
                                <p className="text">Информация об аккаунте пользователя</p>
                            </div>
                            <div className="collection__frame">

                            </div>
                        </div>
                        {user?.email}
                        <button className="register__button" onClick={logOut}>Выйти</button>
                    </div>
                ) : (
                    <form>
                        <div className="form__title">
                            <h2 className="auth__title">Авторизация</h2>
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
                            <button className="register__button"
                                    onClick={(e) => {
                                        register(e)
                                    }}>Авторизоваться</button>
                            <button className="google__button">Войти с Google</button>
                            <div className="form__footer">
                                <p className="form__footer__text">Уже есть аккаунт?</p>
                                <a href="" className="form__footer__link">Зарегистрироваться</a>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Auth;