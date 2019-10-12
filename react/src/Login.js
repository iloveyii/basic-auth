import React from 'react';
import Dashboard from './Dashboard';
import axios from 'axios';
import './App.css';



class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username : '',
            password: '',
            login: false
        }
    }

    handleChange(e) {
        e.preventDefault();
        const field = e.target.id;
        const value = e.target.value;
        this.setState({[field]: value});
    }

    handleLogin(e) {
        e.preventDefault();
        const url = 'http://localhost:8080/api/v1/login';
        axios.get(url, {
            auth:{
                username: this.state.username,
                password: this.state.password
            },
            headers : {
                username: this.state.username,
                password: this.state.password
            }

        }).then(res => {
            if(res.data && res.data.authenticated) {
                this.setState({login: true});
            }
            console.log('res', res.data);
            return res.data;
        }).catch(error => {
            throw new Error(error);
            console.dir(error);
        });
    }


    render() {

        if(this.state.login) return <Dashboard />

        return (

            <section style={{marginTop: '30px'}}>
                <h2>Login</h2>

                <div className="row justify-content-md-center">
                    <div id="login" className="col-3 col-offset-3">
                        <form action="">
                            <div className="form-group">
                                <input id="username" onChange={(e)=>this.handleChange(e)} type="text" className="form-control" value={this.state.username}/>
                                <input id="password" onChange={(e)=>this.handleChange(e)} type="password" className="form-control" value={this.state.password}/>

                                <button onClick={(e)=> this.handleLogin(e)} className="btn btn-success">Login</button>
                            </div>
                        </form>
                    </div>

                </div>
            </section>
        )
    }
}

export default Login;
