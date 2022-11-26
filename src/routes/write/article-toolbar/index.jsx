import classNames from "classnames";
import { useSlateStatic } from "slate-react";
import { getActiveStyles, toggleStyle } from "../article-editor/modules/utils";
import "./style.scss";

const sections = [{}];

const characterStyles = [
	{ style: "bold", icon: "format_bold" },
	{ style: "italic", icon: "format_italic" },
	{ style: "strikethrough", icon: "format_strikethrough" },
	{ style: "underline", icon: "format_underlined" },
	{ style: "code", icon: "code" },
];

export default function ArticleToolbar(props) {
	const { selection, previousSelection } = props;

	const editor = useSlateStatic();

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
				<span className="section-title">Character</span>
				<div className="section-buttons">
					{characterStyles.map((item) => (
						<MenuButton
							key={item.style}
							isActive={getActiveStyles(editor).has(item.style)}
							iconName={item.icon}
							onMouseDown={(event) => {
								event.preventDefault();
								toggleStyle(editor, item.style);
							}}
						/>
					))}
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
					<MenuButton iconName="code_blocks" />
				</div>
			</div>
		</div>
	);
}

function MenuButton(props) {
	const { isActive, iconName, ...otherProps } = props;
	return (
		<button
			className={classNames("editor-menu-button", { active: isActive })}
			{...otherProps}
		>
			<MaterialIcon iconName={iconName} />
		</button>
	);
}

function MaterialIcon(props) {
	return <span className="material-symbols-sharp">{props.iconName}</span>;
}
