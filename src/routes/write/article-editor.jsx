import { Component } from "react";
import { Editable } from "slate-react";

export default class ArticleEditable extends Component {
	render() {
		return <Editable className="slate-editor" />;
	}
}
