import React from "react";
import userService from "../services/userService";
import { useState, } from "react";
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

function LoginComp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();

        const loginRequest = { username: username, password: password };

        try {
            const response = await userService.login(loginRequest);

            console.log(response);

            if (response) {
                navigate('/employees');
            } else {
                alert('Invalid username or password');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while logging in');
        }

    };




    return (
        <div>
            <div className="container ">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className='card'>
                            <div className='card-body'>
                                <div className="card-title" >
                                    <h3 className="text-center">Login</h3>
                                </div>
                                <hr />
                                <form onSubmit={login}>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label text-left">UserName</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            placeholder="Enter username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block">
                                        Login
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginComp;