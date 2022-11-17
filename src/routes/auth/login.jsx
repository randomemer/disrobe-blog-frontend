import ValidatingInput from "components/form-input";
import { Component } from "react";
import { Link } from "react-router-dom";
import { emailValidator, emptyValidator } from "utils";

export default class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.fields = {};
	}

	handleSubmit(event) {
		event.preventDefault();

		if (!this.isValid()) return;
	}

	isValid() {
		for (const field of Object.values(this.fields)) {
			if (!field.isValid()) return false;
		}
		return true;
	}

	async registerUser() {
		try {
		} catch (error) {}
	}

	render() {
		return (
			<form className="auth-form" noValidate onSubmit={this.handleSubmit}>
				<div className="form-header">
					<h1>Welcome back!</h1>
				</div>

				<fieldset className="inputs">
					<div className="input-box fill-grid-row">
						<ValidatingInput
							validators={[emptyValidator, emailValidator]}
							ref={(cmp) => (this.fields.email = cmp)}
						>
							<input
								name="email"
								type="email"
								placeholder="Email"
							/>
						</ValidatingInput>
					</div>
					<div className="input-box fill-grid-row">
						<ValidatingInput
							validators={[emptyValidator]}
							ref={(cmp) => (this.fields.password = cmp)}
						>
							<input
								autoComplete="on"
								name="password"
								type="password"
								placeholder="Password"
							/>
						</ValidatingInput>
					</div>
					<div className="password-options fill-grid-row">
						<div className="remember-user-option">
							<input
								type={"checkbox"}
								name="remember-user"
								id="remember-user"
							/>
							<label htmlFor="remember-user">Remember Me</label>
						</div>
						<Link className="forgot-pwd-link" to="/">
							Forgot Password?
						</Link>
					</div>
				</fieldset>

				<button
					className="login-btn"
					type={"submit"}
					onClick={this.handleSubmit}
				>
					Login
				</button>
			</form>
		);
	}
}
