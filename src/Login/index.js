import React, {Component} from 'react'


class Login extends Component {
	constructor(){
		super();
		this.state = {
			username: '',
			password: ''

		}
	}
	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value})
	}
	handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const loginResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/auth/login', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-type' : 'application/json'
				}
			})
			const parsedResponse = await loginResponse.json()
			console.log("here's parsedResponse", parsedResponse);
			// if(parsedResponse.data === 'login successful') {

			// }
			this.props.login(this.state.username, this.state.password)
			this.props.hideResults()
		} catch(err) {
			console.log(err);
		}
	}
	render() {
		return(
			<form onSubmit={this.handleSubmit}>
			Username:
			<input type='text' name='username' value={this.state.username} onChange={this.handleChange}/>
			Password:
			<input type='password' name='password' value={this.state.password} onChange={this.handleChange}/>
			<button type='submit'> Login </button>
			</form>
			)
	}
}
export default Login