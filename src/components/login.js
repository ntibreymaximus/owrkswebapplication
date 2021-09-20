import React, { Component } from "react";
import "../css/login.css";
import { Link } from "react-router-dom";
export default class Login extends Component {
	render() {
		return (
			<div className='login'>
				<h1 className='login-header'>OWRKS</h1>
				<div className='col-md-6'>
					<form>
						<h2 className='loginform-header'>Admin Login</h2>
						<div className='form-group'>
							<label htmlFor='username'>Username</label>
							<div className='forminputcontainer'>
								<input
									type='text'
									name='username'
									className='form-control forminput'
									id='username'
									aria-describedby='username'
								/>
							</div>
							<label htmlFor='password'>Password</label>
							<div className='forminputcontainer'>
								<input
									type='password'
									name='password'
									className='form-control forminput'
									id='password'
								/>
							</div>
							<div className='forminputcontainer'>
								<Link to='/dashboard/home'>
									<button type='button' className='btn btn-primary formbutton'>
										Login
									</button>
								</Link>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}
