import React, { Component } from "react";
import AppHeader from "@/components/header";
import "./style.scss";
import { Slate, withReact } from "slate-react";
import ArticleEditable from "./article-editor";
import ArticleToolbar from "./article-toolbar";
import { createEditor } from "slate";

export default class Write extends Component {
	state = {
		content: [
			{
				type: "paragraph",
				children: [{ text: "A line of text in a paragraph." }],
			},
		],
		editor: withReact(createEditor()),
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<React.Fragment>
				<AppHeader />
				<div id="app">
					<Slate
						editor={this.state.editor}
						value={this.state.content}
					>
						<main className="app-main">
							{/* <div>
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
								<div className="textarea-container"></div>
							</div> */}
							<ArticleEditable />
						</main>
						<ArticleToolbar />
					</Slate>
				</div>
			</React.Fragment>
		);
	}
}
