import { Component, Fragment } from "react";
import defaultPicture from "@/assets/images/default-pfp.jpg";
import FormTextInput from "@/components/text-input";
import { emptyValidator } from "@/utils";

class ProfilePictureField extends Component {
	state = {
		localImgSrc: null,
		value: null,
	};

	clickInput = () => this.input.click();

	onImageChange = (event) => {
		const [file] = event.target.files;
		this.setState({ localImgSrc: file ? URL.createObjectURL(file) : null });
	};

	render() {
		return (
			<Fragment>
				<label htmlFor="profile-image" className="profile-form-label">
					Profile Picture
				</label>
				<div
					className="profile-img-contianer"
					onClick={this.clickInput}
				>
					<img
						alt="profile"
						src={this.state.localImgSrc || defaultPicture}
					/>
					<input
						type={"file"}
						name="profile-image"
						hidden={true}
						accept={
							"image/png, image/jpg, image/jpeg, image/bmp, image/webp"
						}
						ref={(el) => (this.input = el)}
						onChange={this.onImageChange}
					/>
				</div>
				<div className="pfp-edit-buttons">
					<button className="change-btn" onClick={this.clickInput}>
						Change
					</button>
					<button
						className="remove-btn"
						onClick={() => this.setState({ localImgSrc: null })}
					>
						Remove
					</button>
				</div>
			</Fragment>
		);
	}
}

export default class EditForm extends Component {
	formFields = {};

	onSubmit = (event) => {
		const fields = Object.entries(this.formFields);
		const isValid = fields.every(([name, field]) => field.isValid());
		if (isValid) return;

		const data = fields.map(([name, field]) => field.value);
		console.log(data);
	};

	render() {
		const profile = this.props.profile;
		return (
			<div className="profile-edit-form">
				<div className="profile-left-pane">
					<ProfilePictureField
						ref={(el) => (this.formFields.picture = el)}
					/>
				</div>
				<div className="profile-right-pane">
					<div className="profile-fields">
						<FormTextInput
							label="Name *"
							className="profile-field"
							inputOptions={{
								type: "text",
								name: "name",
								defaultValue: profile.name,
							}}
							validators={[emptyValidator]}
						/>
						<FormTextInput
							label="Bio"
							className="profile-field"
							inputOptions={{
								type: "text",
								name: "bio",
								placeholder: "Describe yourself",
							}}
						/>
						<div className="buttons">
							<button className="discard-btn">Reset</button>
							<button
								className="save-btn"
								onClick={this.onSubmit}
							>
								Update
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
