import defaultPicture from "@/assets/images/default-pfp.jpg";
import FormTextInput from "@/components/text-input";
import { auth, db, storage } from "@/modules/firebase";
import { emptyValidator } from "@/utils";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { extname } from "path";
import { Component, Fragment } from "react";

class ProfilePictureField extends Component {
	state = {
		value: this.props.inputOptions.defaultValue,
	};

	get value() {
		return this.state.value;
	}

	clickInput = () => this.input.click();

	onImageChange = (event) => {
		const [file] = event.target.files;
		console.log(file);
		this.setState({ value: file });
	};

	validate() {
		return true;
	}

	reset() {
		this.setState({ value: this.props.inputOptions.defaultValue });
	}

	render() {
		let image = this.state.value;
		if (this.state.value instanceof File) {
			image = URL.createObjectURL(image);
		}

		return (
			<Fragment>
				<label htmlFor="profile-image" className="profile-form-label">
					Profile Picture
				</label>
				<div
					className="profile-img-contianer"
					onClick={this.clickInput}
				>
					<img alt="profile" src={image || defaultPicture} />
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
						onClick={() => this.setState({ value: null })}
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

	onSubmit = async (event) => {
		const fields = Object.entries(this.formFields);
		const isValid = fields.every(([name, field]) => field.validate());

		const data = Object.fromEntries(
			fields.map(([name, field]) => [name, field.value])
		);
		console.log(data);
		if (!isValid) return;

		this.setState({ isLoading: true });
		try {
			console.log(this.props);
			// upload picture
			const uid = auth.currentUser.uid;
			if (data.picture) {
				const path = `images/authors/${uid}${extname(
					data.picture.name
				)}`;
				const locationRef = ref(storage, path);

				const uploadResult = await uploadBytes(
					locationRef,
					data.picture
				);

				data.picture = uploadResult.ref.fullPath;
			}

			// set data in firestore
			const document = doc(db, "authors", uid);
			await setDoc(document, {
				picture: data.picture || undefined,
				name: data.name,
				bio: data.bio,
			});
			console.log("changed document");
		} catch (error) {
			console.error(error);
		}
		this.setState({ isLoading: false });
	};

	onReset = () => {
		Object.values(this.formFields).forEach((field) => {
			field.reset();
			field.validate();
		});
	};

	render() {
		const profile = this.props.profile;
		return (
			<div className="profile-edit-form">
				<div className="profile-left-pane">
					<ProfilePictureField
						inputOptions={{ defaultValue: profile.picture }}
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
								placeholder: "Your name",
							}}
							ref={(el) => (this.formFields.name = el)}
							validators={[emptyValidator]}
						/>
						<FormTextInput
							label="Bio"
							className="profile-field"
							ref={(el) => (this.formFields.bio = el)}
							inputOptions={{
								type: "text",
								name: "bio",
								defaultValue: profile.bio,
								placeholder: "Describe yourself",
							}}
						/>
						<div className="buttons">
							<button
								className="discard-btn"
								onClick={this.onReset}
							>
								Reset
							</button>
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
