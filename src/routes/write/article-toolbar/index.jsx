import { Component } from "react";
import "./style.scss";

export default class ArticleToolbar extends Component {
	render() {
		return (
			<div className="article-toolbar">
				<div className="toolbar-section">
					<span className="section-title">Headings</span>
					<div className="section-buttons">
						<MenuButton iconName="format_h2" />
						<MenuButton iconName="format_h3" />
						<MenuButton iconName="format_h4" />
						<MenuButton iconName="format_h5" />
						<MenuButton iconName="format_h6" />
					</div>
				</div>
				<div className="toolbar-section">
					<span className="section-title">Text</span>
					<div className="section-buttons">
						<MenuButton iconName="format_bold" />
						<MenuButton iconName="format_italic" />
						<MenuButton iconName="format_strikethrough" />
						<MenuButton iconName="format_underlined" />
					</div>
				</div>
				<div className="toolbar-section">
					<span className="section-title">Lists</span>
					<div className="section-buttons">
						<MenuButton iconName="format_list_bulleted" />
						<MenuButton iconName="format_list_numbered" />
					</div>
				</div>
				<div className="toolbar-section">
					<span className="section-title">Other</span>
					<div className="section-buttons">
						<MenuButton iconName="link" />
						<MenuButton iconName="format_quote" />
						<MenuButton iconName="image" />
						<MenuButton iconName="code" />
						<MenuButton iconName="code_blocks" />
					</div>
				</div>
			</div>
		);
	}
}

function MenuButton(props) {
	return (
		<button className="editor-menu-button">
			<MaterialIcon iconName={props.iconName} />
		</button>
	);
}

function MaterialIcon(props) {
	return <span className="material-symbols-sharp">{props.iconName}</span>;
}
