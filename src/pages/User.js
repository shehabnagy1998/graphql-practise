import React, { Component } from 'react'

export default class Event extends Component {

    constructor(props) {
        super(props);
        this.email = React.createRef();
        this.password = React.createRef();
        this.state = {
            type: ['Sign up', 'Log in'],
            login: true,
        }
    }

    handleChange = e => {
        e.preventDefault();
        this.setState({
            login: !this.state.login
        })
    }

    handleClick = e => {
        e.preventDefault();
        let email = this.email.current.value,
            password = this.password.current.value,
            requestBody = {
                query: `
                    query {
                        login(userInput: {email: "${email}", password: "${password}"}) {
                            userId
                            token
                            expireTime
                        }
                    }
                `
            };
        if (!this.state.login) {
            requestBody = {
                query: `
                    mutation {
                        createUser(userInput: {email: "${email}", password: "${password}"}) {
                            _id
                            email
                            password
                        }
                    }
                `
            };
        };

        fetch('http://localhost:8080/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    console.log(email, password);
                    throw new Error('failed to get data')
                }
                return res.json()
            })
            .then(res => {
                console.log(res)
            })
    }

    render() {
        return (
            <article className="mt-5" >
                <h1 className="display-3 text-center">{this.state.login === false ? this.state.type[0] : this.state.type[1]}</h1>
                <form className="row justify-content-center">
                    <div className="form-group col-lg-8 col-10">
                        <label htmlFor="email">Email: </label>
                        <input type="email" id="email" className="form-control" ref={this.email} />
                    </div>
                    <div className="form-group col-lg-8 col-10">
                        <label htmlFor="password">Password: </label>
                        <input type="password" id="password" className="form-control" ref={this.password} />
                    </div>
                    <div className="form-group col-lg-8 col-10">
                        <button type="submit" className="btn btn-primary btn-lg btn-block" onClick={this.handleClick}>{this.state.login === false ? this.state.type[0] : this.state.type[1]}</button>
                    </div>
                    <div className="form-group col-lg-8 col-10">
                        <button className="btn btn-danger btn-lg btn-block" onClick={this.handleChange}>Switch {this.state.login === true ? this.state.type[0] : this.state.type[1]}</button>
                    </div>
                </form>
            </article>
        )
    }
}