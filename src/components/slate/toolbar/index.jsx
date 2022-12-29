import ImageEditor from "@/components/slate/image-editor";
import {
	getActiveLinkNode,
	isBlockActive,
	isMarkActive,
	toggleBlock,
	toggleLink,
	toggleMark,
} from "@/utils/editor-utils";
import classNames from "classnames";
import { Fragment, useState } from "react";
import ReactModal from "react-modal";
import { useSlate } from "slate-react";
import "./style.scss";

const CHARACTER_STYLES = [
	{ style: "bold", icon: "format_bold" },
	{ style: "italic", icon: "format_italic" },
	{ style: "strikethrough", icon: "format_strikethrough" },
	{ style: "underline", icon: "format_underlined" },
	{ style: "code", icon: "code" },
];

const LIST_STYLES = [
	{ style: "numbered-list", icon: "format_list_numbered" },
	{ style: "bulleted-list", icon: "format_list_bulleted" },
];

const HEADING_STYLES = [
	{ style: "h2", icon: "format_h2" },
	{ style: "h3", icon: "format_h3" },
	{ style: "h4", icon: "format_h4" },
	{ style: "h5", icon: "format_h5" },
	{ style: "h6", icon: "format_h6" },
];

export default function ArticleToolbar() {
	const editor = useSlate();

	const [isImageModalOpen, setImageModalOpen] = useState(false);

	return (
		<Fragment>
			<div className="article-toolbar">
				{/* HEADING STYLES */}
				<div className="toolbar-section">
					<span className="section-title">Headings</span>
					<div className="section-buttons">
						{HEADING_STYLES.map((item) => (
							<BlockButton
								key={item.style}
								format={item.style}
								iconName={item.icon}
							/>
						))}
					</div>
				</div>
				{/* CHARACTER STYLES */}
				<div className="toolbar-section">
					<span className="section-title">Character</span>
					<div className="section-buttons">
						{CHARACTER_STYLES.map((item) => (
							<MarkButton
								key={item.style}
								format={item.style}
								iconName={item.icon}
							/>
						))}
					</div>
				</div>
				{/* LIST STYLES */}
				<div className="toolbar-section">
					<span className="section-title">Lists</span>
					<div className="section-buttons">
						{LIST_STYLES.map((item) => (
							<BlockButton
								key={item.style}
								format={item.style}
								iconName={item.icon}
							/>
						))}
					</div>
				</div>
				{/* OTHER ACTIONS */}
				<div className="toolbar-section">
					<span className="section-title">Other</span>
					<div className="section-buttons">
						<MenuButton
							iconName="link"
							isActive={getActiveLinkNode(editor)}
							onMouseDown={(event) => {
								event.preventDefault();
								toggleLink(editor);
							}}
						/>
						<BlockButton format="blockquote" iconName="format_quote" />
						<MenuButton
							iconName="image"
							onMouseDown={() => setImageModalOpen(true)}
						/>
						<MenuButton iconName="code_blocks" />
					</div>
				</div>
			</div>
			{/* Image Editor Dialog */}
			<ReactModal
				isOpen={isImageModalOpen}
				closeTimeoutMS={150}
				onRequestClose={(event) => {
					event.preventDefault();
					setImageModalOpen(false);
				}}
			>
				<ImageEditor closeModal={() => setImageModalOpen(false)} />
			</ReactModal>
		</Fragment>
	);
}

// Toolbar Components

// Base Components

function MaterialIcon(props) {
	return <span className="material-symbols-rounded">{props.iconName}</span>;
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

// Higher Components

function MarkButton({ format, iconName }) {
	const editor = useSlate();
	return (
		<MenuButton
			isActive={isMarkActive(editor, format)}
			iconName={iconName}
			onMouseDown={(event) => {
				event.preventDefault();
				toggleMark(editor, format);
			}}
		/>
	);
}

function BlockButton({ format, iconName }) {
	const editor = useSlate();
	return (
		<MenuButton
			isActive={isBlockActive(editor, format)}
			iconName={iconName}
			onMouseDown={(event) => {
				event.preventDefault();
				toggleBlock(editor, format);
			}}
		/>
	);
}
