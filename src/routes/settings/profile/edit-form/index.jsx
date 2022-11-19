import { IonIcon } from "@ionic/react";
import { personOutline } from "ionicons/icons";
import { Component, Fragment } from "react";

class ProfileField extends Component {
	render() {
		return (
			<div className="profile-field">
				<label
					className="profile-form-label"
					htmlFor={this.props.inputOptions.name}
				>
					{this.props.label}
				</label>
				<input {...this.props.inputOptions} />
				<span className="message"></span>
			</div>
		);
	}
}

class ProfilePictureField extends Component {
	openFileDialog(event) {
		const input = document.querySelector('input[name="profile-image"]');
		console.log(input);

		var clickEvent = new MouseEvent("click", {
			view: window,
			bubbles: true,
			cancelable: false,
		});

		input.dispatchEvent(clickEvent);
	}

	render() {
		return (
			<Fragment>
				<label htmlFor="profile-image" className="profile-form-label">
					Profile Picture
				</label>
				<div
					className="profile-img-contianer"
					onClick={this.openFileDialog}
				>
					<img alt="profile" />
					<IonIcon icon={personOutline} />
					<input
						type={"file"}
						name="profile-image"
						hidden={true}
						accept={
							"image/png, image/jpg, image/jpeg, image/bmp, image/webp"
						}
					/>
				</div>
				<div className="pfp-edit-buttons">
					<button
						className="change-btn"
						onClick={this.openFileDialog}
					>
						Change
					</button>
					<button className="remove-btn">Remove</button>
				</div>
			</Fragment>
		);
	}
}

export default class EditForm extends Component {
	render() {
		return (
			<div className="profile-edit-form">
				<div className="profile-left-pane">
					<ProfilePictureField />
				</div>
				<div className="profile-right-pane">
					<div className="profile-fields">
						<ProfileField
							label="Name *"
							inputOptions={{
								type: "text",
								name: "name",
								value: this.props.user,
							}}
						/>
						<ProfileField
							label="Bio"
							inputOptions={{
								type: "text",
								name: "bio",
								placeholder: "Describe yourself",
							}}
						/>
						<div className="buttons">
							<button className="discard-btn">Reset</button>
							<button className="save-btn">Update</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
