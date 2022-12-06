/* eslint-disable no-undef */
import { useEffect, useRef, useState } from "react";
import "style./scss";

export default function Modal(props) {
	const [isOpen, setOpen] = useState(false);
	const modalRef = useRef(null);
	const modalContentRef = useRef(null);

	const onClick = (event) => {
		if (!event.target.contains(modalContentRef.current)) {
			console.log("closed modal");
			setOpen(false);
		}
	};

	useEffect(() => {
		const modalEl = modalRef.current;
		if (isOpen) {
			modalEl.classList.add("modal-active");
		} else {
			modalEl.classList.remove("modal-active");
		}
	}, [isOpen]);

	return (
		<div className="modal-container" onClick={onClick} ref={modalRef}>
			<div className="modal-content" ref={modalContentRef}>
				{props.children}
			</div>
		</div>
	);
}
