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

		this.validator = props.validator;
	}

	componentDidMount() {
		this.input = this.inputWrapper.querySelector("input");
		this.input.addEventListener("blur", this.validate);
	}

	validate = (event) => {
		const message = this.validator(this.input.value);
		this.setState({ message });

		const messageEl = this.inputWrapper.querySelector(".message");
		if (message) {
			messageEl.classList.add("active");
			gsap.to(messageEl, { opacity: 1, onComplete: () => {} });
		} else {
			gsap.to(messageEl, {
				opacity: 0,
				onComplete: () => {
					messageEl.classList.remove("active");
				},
			});
		}
	};

	componentWillUnmount() {
		this.input.removeEventListener("blur", this.validate);
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
