import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import { useState, useEffect } from 'react';

function HeaderComp() {

    const [isLoggedin, setIsLoggedin] = useState(false);


    const navigate = useNavigate();
    const currentUser = userService.getCurrentUser();

    useEffect(() => {
        if (currentUser) {
            setIsLoggedin(true);
        }
    }, [currentUser]);

    const logout = () => {
        navigate('/login');
        userService.logout();
        setIsLoggedin(false);
        
    };

    return (
        <div>
            {isLoggedin ? (
                <div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand">Employee Management System</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/employees">Employees</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/designations">Designations</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" >Action</a></li>
                                        <li><a className="dropdown-item" >Another action</a></li>
                                        <li><a className="dropdown-item" >Something else here</a></li>
                                    </ul>
                                </li>
    
                            </ul>

                            {/* show logged in user */}
                            <span className="nav-item float-end">
                                <span className="nav-link"
                                        style={{ marginRight: '10px' }}
                                >Welcome<b> {currentUser.username}</b></span>
                            </span>
    
                            <span className="nav-item float-end">
                                {currentUser && (
                                    <button className="btn btn-primary" onClick={logout}>
                                        Logout
                                    </button>
                                )}
                            </span>
    
                        </div>
                    </div>
                </nav>
            </div>
                ):(
                    <div>
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid">
                            <a className="navbar-brand">Employee Management System</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
    
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
    
                                </ul>
    
                            </div>
                        </div>
                    </nav>
                </div>
                )}
        </div>
    );
}

export default HeaderComp;
