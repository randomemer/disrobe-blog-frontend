import ReactModal from "react-modal";

ReactModal.defaultStyles.overlay = {
	position: "fixed",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	zIndex: 999,
	backgroundColor: "rgba(255, 255, 255, 0.5)",
};

ReactModal.defaultStyles.content = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
};

ReactModal.setAppElement("#root");
