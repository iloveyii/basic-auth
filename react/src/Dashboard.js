import React from 'react';
import Row from './Row';
import axios from 'axios';
import './App.css';


class Dashboard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section style={{marginTop: '30px'}}>
                <h2>Logged in</h2>

                <div className="row justify-content-md-center">
                    <div id="login" className="col-3 col-offset-3">
                        <p>Welcome to our site</p>
                    </div>
                </div>

            </section>
        )
    }
}

export default Dashboard;
