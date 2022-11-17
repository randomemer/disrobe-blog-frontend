/* eslint-disable no-undef */
import { Component } from "react";
import { IonIcon } from "@ionic/react";
import { warningOutline } from "ionicons/icons";
import "./style.scss";

export default class ValidatingInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			message: "",
		};

		this.validators = props.validators;
	}

	componentDidMount() {
		this.input = this.inputWrapper.querySelector("input");
		this.messageEl = this.inputWrapper.querySelector(".message");

		this.input.addEventListener("blur", this.onBlurValidate);
	}

	validate = () => {
		for (const validator of this.validators) {
			const message = validator(this.input.value);

			if (message) {
				// if any check failed
				this.setState({ message });
				this.messageEl.classList.add("active");
				gsap.to(this.messageEl, { opacity: 1 });
				return false;
			}
		}
		// if all checks passed
		this.messageEl.classList.remove("active");
		return true;
	};

	onBlurValidate = (event) => {
		// first time validation only on blur
		this.validate();
		// for subsequent validation, be more rigorous
		this.input.removeEventListener("blur", this.onBlurValidate);
		this.input.addEventListener("input", this.validate);
	};

	componentWillUnmount() {
		this.input.removeEventListener("blur", this.onBlurValidate);
		this.input.removeEventListener("input", this.validate);
	}

	render() {
		return (
			<div
				className="input-wrapper"
				ref={(el) => (this.inputWrapper = el)}
			>
				{this.props.children}
				<div className="message">
					<IonIcon icon={warningOutline} className="message-icon" />
					<span>{this.state.message}</span>
				</div>
			</div>
		);
	}
}
