import "./style.scss";

export default function spinner(props) {
	return (
		<div
			className="outer"
			style={{
				width: props.radius,
				height: props.radius,
				borderWidth: 5,
			}}
		></div>
	);
}
