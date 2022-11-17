import ValidatingInput from "components/form-input";
import { Component } from "react";
import { Link } from "react-router-dom";
import { emailValidator, emptyValidator } from "utils";
import Spinner from "components/spinner";

export default class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.fields = {};
	}

	handleSubmit = (event) => {
		event.preventDefault();

		if (!this.isValid()) return;

		const data = Object.fromEntries(
			Object.entries(this.fields).map(([key, component]) => [
				key,
				component.input.value.trim(),
			])
		);

		const shouldRemember = document.getElementById("remember-user").value;

		this.props.login(data, shouldRemember);
	};

	isValid() {
		for (const field of Object.values(this.fields)) {
			if (!field.validate()) return false;
		}
		return true;
	}

	render() {
		const isLoading = this.props.loading;
		return (
			<form
				className="auth-form"
				noValidate={true}
				onSubmit={this.handleSubmit}
			>
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
					{isLoading ? <Spinner radius={30} /> : undefined}
					<span>Login</span>
				</button>
			</form>
		);
	}
}
