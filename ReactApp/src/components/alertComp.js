import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';

function AlertComp() {
    const [message, setMessage] = useState('');
    const location = useLocation();
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (location.state) {
           
            if (location.state.message) {
                setShowAlert(true);
                setMessage(location.state.message);
            }
            else
            {
                setShowAlert(false);
                setMessage('');
            }

            const timer = setTimeout(() => {
                setShowAlert(false);
                setMessage('');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <div className='container'>
            {showAlert && (
                <div className='alert alert-success alert-dismissible fade show' role='alert'>
                    {message}
                    <button
                        type='button'
                        className='btn-close'
                        data-bs-dismiss='alert'
                        aria-label='Close'
                        onClick={() => setShowAlert(false)}
                    ></button>
                </div>
            )}
        </div>
    );
}

export default AlertComp;
