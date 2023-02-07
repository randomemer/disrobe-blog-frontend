import TextInput from "@/components/text-input";
import { Component } from "react";
import { emailValidator, emptyValidator, passwordValidator } from "@/utils";
import Spinner from "@/components/spinner";
import { keyOutline, mailOutline, personOutline } from "ionicons/icons";

export default class RegisterForm extends Component {
	constructor(props) {
		super(props);
		this.fields = {};
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
					<div className="input-box">
						<TextInput
							validators={[emptyValidator]}
							ref={(cmp) => (this.fields.name = cmp)}
							prefixIcon={personOutline}
							inputOptions={{
								name: "name",
								type: "text",
								placeholder: "Full Name",
							}}
						/>
					</div>
					<div className="input-box">
						<TextInput
							validators={[emptyValidator, emailValidator]}
							ref={(cmp) => (this.fields.email = cmp)}
							prefixIcon={mailOutline}
							inputOptions={{
								name: "email",
								type: "email",
								placeholder: "Email",
							}}
						/>
					</div>
					<div className="input-box">
						<TextInput
							validators={[emptyValidator, passwordValidator]}
							ref={(cmp) => (this.fields.password = cmp)}
							prefixIcon={keyOutline}
							inputOptions={{
								autoComplete: "on",
								name: "password",
								type: "password",
								placeholder: "Password",
							}}
						/>
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
}
