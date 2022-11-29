import { useRouteError } from "react-router-dom";
import "./style.scss";

export default function ErrorDevelopmentPage() {
	const error = useRouteError();

	return (
		<div className="error-page-container">
			<div className="error-dev-element">
				<h1>Looks like you fucked up.</h1>
				<div className="error-info">
					<pre className="error-name">{error.name}</pre>
					<pre className="error-message">{error.message}</pre>
					<pre className="error-stack">{error.stack}</pre>
				</div>
			</div>
		</div>
	);
}
