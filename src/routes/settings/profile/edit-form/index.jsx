import { IonIcon } from "@ionic/react";
import { personOutline } from "ionicons/icons";
import { Component } from "react";

class ProfileField extends Component {
	render() {
		return (
			<div className="profile-field">
				<label htmlFor={this.props.name}>{this.props.label}</label>
				<input
					type={this.props.type}
					name={this.props.name}
					placeholder={this.props.placeholder}
				/>
				<span className="message"></span>
			</div>
		);
	}
}

export default class EditForm extends Component {
	render() {
		return (
			<div className="profile-edit-form">
				<div className="profile-img-contianer">
					<img alt="profile" />
					<IonIcon icon={personOutline} />
					<input type={"file"} name="profile-image" />
				</div>
				<div className="profile-fields">
					<ProfileField type="text" name="name" label="Name *" />
					<ProfileField
						type="text"
						name="bio"
						label="Bio"
						placeholder="Describe yourself"
					/>
					<div className="buttons">
						<button className="discard-btn">Reset</button>
						<button className="save-btn">Update</button>
					</div>
				</div>
			</div>
		);
	}
}
