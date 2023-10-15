import React, { Component } from 'react';

class FooterComp extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <footer className="footer mt-auto py-3 bg-body-tertiary">
                    <div className="container">
                        <span className="text-muted">Place sticky footer content here.</span>
                    </div>
                </footer>
            </div>
        );
    }
}

export default FooterComp;