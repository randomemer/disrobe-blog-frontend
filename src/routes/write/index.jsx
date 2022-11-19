import React, { Component } from "react";
import AppHeader from "@/components/header";
import "./style.scss";

export default class Write extends Component {
	constructor(props) {
		super(props);

		this.setTextareaRef = (el) => (this.textarea = el);
		this.setReplicaRef = (el) => (this.textareaReplica = el);
	}

	autoResize() {
		this.textareaReplica.dataset.replicatedValue = this.textarea.value;
		console.log(this.textarea.value);
	}

	componentDidMount() {
		this.textarea.addEventListener("input", this.autoResize.bind(this));
	}

	componentWillUnmount() {
		this.textarea.removeEventListener("input", this.autoResize);
	}

	render() {
		return (
			<React.Fragment>
				<AppHeader />
				<main>
					<form spellCheck="true">
						<input
							className="form-input"
							type={"text"}
							name="article-title"
							placeholder="Title"
						/>
						<input
							className="form-input"
							type={"text"}
							name="article-subtitle"
							placeholder="Subtitle"
						/>
						<div className="textarea-container">
							<textarea
								ref={this.setTextareaRef}
								className="form-input"
								name="article-content"
								placeholder="Your amazing story"
							/>
							<div
								ref={this.setReplicaRef}
								className="textarea-replica"
							></div>
						</div>
					</form>
				</main>
			</React.Fragment>
		);
	}
}
