import ValidatingInput from "components/form-input";
import { Component } from "react";
import { emailValidator, emptyValidator, passwordValidator } from "utils";
import Spinner from "components/spinner";

export default class RegisterForm extends Component {
	constructor(props) {
		super(props);
		this.fields = {};
	}

	handleSubmit = (event) => {
		event.preventDefault();

		if (!this.isValid()) {
			console.log("Invalid form");
			return;
		}

		const data = Object.fromEntries(
			Object.entries(this.fields).map(([key, component]) => [
				key,
				component.input.value.trim(),
			])
		);

		this.props.register(data);
	};

	isValid() {
		let flag = true;
		for (const field of Object.values(this.fields)) {
			if (!field.validate()) {
				flag = false;
			}
		}
		return flag;
	}

	render() {
		const isLoading = this.props.loading;
		return (
			<form className="auth-form" noValidate onSubmit={this.handleSubmit}>
				<div className="form-header">
					<h1>Join us today!</h1>
					<p>Share your stories with the world.</p>
				</div>

				<fieldset className="inputs">
					<div className="input-box name-inputs">
						<ValidatingInput
							validators={[emptyValidator]}
							ref={(cmp) => (this.fields.firstName = cmp)}
						>
							<input
								required
								name="first-name"
								type="text"
								placeholder="First name"
							/>
						</ValidatingInput>
						<ValidatingInput
							validators={[emptyValidator]}
							ref={(cmp) => (this.fields.lastName = cmp)}
						>
							<input
								required
								name="last-name"
								type="text"
								placeholder="Last name"
							/>
						</ValidatingInput>
					</div>
					<div className="input-box">
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
					<div className="input-box">
						<ValidatingInput
							validators={[emptyValidator, passwordValidator]}
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
				</fieldset>

				<button
					className="submit-btn"
					type="submit"
					onClick={this.handleSubmit}
					disabled={isLoading}
				>
					{isLoading ? <Spinner radius={30} /> : undefined}
					<span>Register</span>
				</button>
			</form>
		);
	}
}
