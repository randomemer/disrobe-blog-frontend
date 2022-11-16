import { Component } from "react";

export default class RegisterForm extends Component {
	render() {
		return (
			<form className="auth-form" noValidate>
				<div className="form-header">
					<h1>Join us today!</h1>
					<p>Share your stories with the world.</p>
				</div>

				<fieldset className="inputs">
					<div className="input-box name-inputs">
						<input
							name="first-name"
							type="text"
							placeholder="First name"
						/>
						<input
							name="last-name"
							type="text"
							placeholder="Last name"
						/>
					</div>
					<div className="input-box">
						<input name="email" type="email" placeholder="Email" />
					</div>
					<div className="input-box">
						<input
							autoComplete="on"
							name="password"
							type="password"
							placeholder="Password"
						/>
					</div>
				</fieldset>

				<button className="submit-btn" type="submit">
					Register
				</button>
			</form>
		);
	}
}
