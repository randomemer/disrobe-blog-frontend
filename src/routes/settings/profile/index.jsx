import { auth } from "firebase-mod";
import { Component } from "react";
import EditForm from "./edit-form";
import "./style.scss";

export default class Profile extends Component {
	constructor(props) {
		super(props);
		console.log("profile props :", props);
	}

	render() {
		return (
			<div>
				<EditForm user={auth.currentUser} />
			</div>
		);
	}
}
