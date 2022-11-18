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
			isFocused: false,
		};

		this.validators = props.validators;

		this.onFocusIn = this.onFocusChange.bind(this, true);
		this.onFocusOut = this.onFocusChange.bind(this, false);
	}

	primaryColor = "rgb(255, 135, 135)";
	warningIcon = (<IonIcon icon={warningOutline} className="warning-icon" />);

	componentDidMount() {
		this.input = this.inputWrapper.querySelector("input");
		this.messageEl = this.inputWrapper.querySelector(".message");
		this.input.addEventListener("blur", this.onBlur);
		// for knowing focus state
		this.input.addEventListener("focusin", this.onFocusIn);
		this.input.addEventListener("focusout", this.onFocusOut);
	}

	componentWillUnmount() {
		this.input.removeEventListener("blur", this.onBlur);
		this.input.removeEventListener("input", this.validate);
		// focus listeners
		this.input.removeEventListener("focusin", this.onFocusIn);
		this.input.removeEventListener("focusout", this.onFocusOut);
	}

	render() {
		return (
			<div
				className={[
					"input-wrapper",
					this.state.isFocused ? "input-focused" : "",
				].join(" ")}
				ref={(el) => (this.inputWrapper = el)}
			>
				<div className="input-container">
					<span className="prefix-icon">
						<IonIcon icon={this.props.prefixIcon} />
					</span>
					<input type={"text"} {...this.props.inputOptions} />
					<span className="suffix-icon">
						{!this.state.message ? undefined : this.warningIcon}
					</span>
				</div>
				<div className="message">
					<span>{this.state.message}</span>
				</div>
			</div>
		);
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
		this.setState({ message: "" });
		return true;
	};

	onFocusChange(isFocused, event) {
		this.setState({ isFocused });
	}

	onBlur = (event) => {
		// first time validation only on blur
		this.validate();
		// for subsequent validation, be more rigorous
		this.input.removeEventListener("blur", this.onBlur);
		this.input.addEventListener("input", this.validate);
	};
}
