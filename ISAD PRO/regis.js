import React from 'react';
import './regis.css';

function Register() {
    const handleSubmit = (e) => {
        e.preventDefault();
        window.location = 'login'
    }

    return (
        <div className="container">
            <div className="title">Registration</div>
            <form onSubmit={handleSubmit}>
                <div className="user-details">
                    <div className="input-box">
                        <span className="details">Full Name</span>
                        <input type="text" placeholder="Enter your name" required />
                    </div>
                    <div className="input-box">
                        <span className="details">User name</span>
                        <input type="text" placeholder="Enter your username" required />
                    </div>
                    <div className="input-box">
                        <span className="details">Email</span>
                        <input type="email" placeholder="Enter your email" required />
                    </div>
                    <div className="input-box">
                        <span className="details">Phone number</span>
                        <input type="tel" placeholder="Enter your phone number" required />
                    </div>
                    <div className="input-box">
                        <span className="details">Password</span>
                        <input type="password" placeholder="Enter your password" required />
                    </div>
                </div>
                <div className="button">
                    <input type="submit" onClick={handleSubmit} value="Register" />
                </div>
                <a href="login"><i className="fa-solid fa-backward" style={{color: 'rgba(0, 47, 118, 0.88)'}}></i></a>
            </form>
        </div>
    );
}

export default Register;
