/* eslint-disable no-undef */
import { Component } from "react";
import { IonIcon } from "@ionic/react";
import { warningOutline } from "ionicons/icons";
import "./style.scss";
import classNames from "classnames";

export default class FormTextInput extends Component {
	state = {
		message: "",
		isFocused: false,
	};

	get value() {
		return this.input.value;
	}

	primaryColor = "rgb(255, 135, 135)";

	get label() {
		return this.props.label ? (
			<label htmlFor={this.props.inputOptions.name}>
				{this.props.label}
			</label>
		) : undefined;
	}

	get prefixIcon() {
		return this.props.prefixIcon ? (
			<span>
				<IonIcon className="prefix-icon" icon={this.props.prefixIcon} />
			</span>
		) : undefined;
	}

	get warningIcon() {
		return (
			<IonIcon
				icon={warningOutline}
				style={{ opacity: this.state.message ? 1 : 0 }}
				className="warning-icon"
			/>
		);
	}

	constructor(props) {
		super(props);

		this.onFocusIn = this.onFocusChange.bind(this, true);
		this.onFocusOut = this.onFocusChange.bind(this, false);
	}

	componentDidMount() {
		this.input = this.inputWrapper.querySelector("input");
		this.messageEl = this.inputWrapper.querySelector(".message");

		// add event listeners
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
				className={classNames(this.props.className, "input-wrapper", {
					"input-focused": this.state.isFocused,
				})}
				ref={(el) => (this.inputWrapper = el)}
			>
				{this.label}
				<div className="input-container">
					{this.prefixIcon}
					<input type={"text"} {...this.props.inputOptions} />
					<span className="suffix-icon">
						{this.props.inputOptions.type === "password" ? (
							<div></div>
						) : (
							this.warningIcon
						)}
					</span>
				</div>
				<div className="message">{this.state.message}</div>
			</div>
		);
	}

	reset() {
		this.input.value = this.props.inputOptions.defaultValue;
	}

	validate = () => {
		if (!this.props.validators) return true;
		for (const validator of this.props.validators) {
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

	// event handlers
	onFocusChange(isFocused, event) {
		this.setState({ isFocused });
	}

	onInputChange = (event) => {
		console.log(event.target.value);
		this.setState({ value: event.target.value });
	};

	onBlur = (event) => {
		// first time validation only on blur
		this.validate();
		// for subsequent validation, be more rigorous
		this.input.removeEventListener("blur", this.onBlur);
		this.input.addEventListener("input", this.validate);
	};
}
