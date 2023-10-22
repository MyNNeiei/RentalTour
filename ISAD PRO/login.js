import React from 'react';
import './login.css';

function Login() {
    const handleSubmit = (e) => {
        e.preventDefault();
        window.location = 'newhome'
    }

    return (
        <div id="plan">
            <div className="main">
                <a href="login"><i className="fa-solid fa-house" style={{color: 'rgba(0, 47, 118, 0.43)'}}></i></a>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="txt_field">
                        <input type="text" name="user_name" id="username" />
                        <span></span>
                        <label>Username</label>
                    </div>
                    <div className="txt_field">
                        <input type="password" name="password" id="password" />
                        <span></span>
                        <label>Password</label>
                    </div>
                    <button onClick={handleSubmit} type="submit">Login</button>
                    <div className="signup_link">
                        No account? <a href="regis">Sign up</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
