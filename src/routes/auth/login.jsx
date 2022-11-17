import ValidatingInput from "components/form-input";
import { Component } from "react";
import { Link } from "react-router-dom";
import { emailValidator, passwordValidator } from "utils";

export default class LoginForm extends Component {
	render() {
		return (
			<form className="auth-form" noValidate>
				<div className="form-header">
					<h1>Welcome back!</h1>
				</div>

				<fieldset className="inputs">
					<div className="input-box fill-grid-row">
						<ValidatingInput validator={emailValidator}>
							<input
								name="email"
								type="email"
								placeholder="Email"
							/>
						</ValidatingInput>
					</div>
					<div className="input-box fill-grid-row">
						<ValidatingInput validator={passwordValidator}>
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

				<button className="login-btn" type={"submit"}>
					Login
				</button>
			</form>
		);
	}
}
