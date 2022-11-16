import { Component } from "react";
import "./style.scss";

export default class ValidatingInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			message: "",
		};

		// console.log();

		this.validator = props.validator;
	}

	componentDidMount() {
		this.input = this.inputWrapper.querySelector("input");
		this.input.addEventListener("blur", this.validate);
	}

	validate = (event) => {
		console.log(event);
		this.setState({ message: this.validator(this.input.value) });
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
				<span className="message">{this.state.message}</span>
			</div>
		);
	}
}
