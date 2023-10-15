//design an access denied page
import React from 'react';
import { Link } from 'react-router-dom';

function UnauthorizedAccessComp() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center mt-4">Access Denied</h1>
                    <div className="text-center">
                        <Link to="/login" className="btn btn-primary">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

window.UnauthorizedAccessComp = UnauthorizedAccessComp;

export default UnauthorizedAccessComp;