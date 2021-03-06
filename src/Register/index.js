import React, { Component } from 'react';

class Register extends Component {
	constructor() {
		super();

		this.state = {
			username: '',
			password: '',
			registered: false
		}
	}
	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value})
	}
	handleSubmit = async (e) => {
		e.preventDefault();
		console.log("handleSubmit");
		try { 
			const registerResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/auth/register', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-type': 'application/json'
				}
			})
			console.log(registerResponse);
			const parsedResponse = await registerResponse.json();
			console.log("here's parsedResponse", parsedResponse);
			// if(parsedResponse.data === 'registration successful') {

			// }
			this.props.hideResults()
			this.props.login()

		} catch(err) {
			console.log(err);
		}
	}
			render() {
		return(
			<form onSubmit={this.handleSubmit}>
			Username:
			<input type='text' name='username' onChange={this.handleChange} />
			Password:
			<input type='password' name='password' onChange={this.handleChange} />
			<button>Submit</button>
			</form>
			)
	}
}
export default Register