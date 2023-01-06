import ImageEditor from "@/components/slate/image-dialog";
import useWordCount from "@/hooks/use-word-count";
import { selectSavingStatus } from "@/modules/redux-store/slices/story-draft";
// import { publishArticle } from "@/utils";
import {
	getActiveLinkNode,
	isBlockActive,
	isMarkActive,
	toggleBlock,
	toggleLink,
	toggleMark,
} from "@/utils/editor-utils";
import { IonIcon } from "@ionic/react";
import classNames from "classnames";
import {
	closeOutline,
	cloudDoneOutline,
	cloudOfflineOutline,
	cloudUploadOutline,
	settingsOutline,
} from "ionicons/icons";
import { Fragment, useState } from "react";
import ReactModal from "react-modal";
import { useSelector } from "react-redux";
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

	const storyInfo = useWordCount();

	return (
		<Fragment>
			<aside className="article-toolbar">
				<div className="toolbar-sections">
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
				{/* Status Area */}
				<div className="article-status">
					<div className="article-actions">
						<button
							type="button"
							className="publish-button button"
							onClick={() => {
								// publishArticle();
							}}
						>
							Publish
						</button>
						<button className="article-settings-button">
							<IonIcon icon={settingsOutline} />
						</button>
					</div>
					<div className="content-info">
						<div className="word-count">{storyInfo.wordCount} words</div>
						<span>●</span>
						<div className="read-time">{storyInfo.readTime}</div>
					</div>
					<SavingIndicator />
				</div>
			</aside>
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
function SavingIndicator() {
	const state = useSelector(selectSavingStatus);

	let icon, message;
	switch (state) {
		case "pending":
			icon = cloudUploadOutline;
			message = "Saving";
			break;

		case "fulfilled":
			icon = cloudDoneOutline;
			message = "Saved";
			break;

		case "rejected":
			icon = closeOutline;
			message = "Saving Failed";
			break;

		default:
			icon = cloudOfflineOutline;
			message = "Not Saved";
			break;
	}

	return (
		<div className="saving-indicator">
			<IonIcon
				icon={icon}
				className={classNames({
					error: state === "rejected",
					success: state === "fulfilled",
				})}
			/>
			<span>{message}</span>
		</div>
	);
}

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
