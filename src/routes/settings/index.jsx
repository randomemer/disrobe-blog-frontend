import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./style.scss";

export default function Settings() {
	const location = useLocation();

	console.log(location);

	useEffect(() => {});

	const isActiveLink = (path) => {
		return location.pathname === path;
	};

	return (
		<div className="settings-container">
			<div className="settings-side-nav">
				<div className="active-link-line"></div>
				<ul className="settings-links">
					{SETTINGS_SUBROUTES.map(({ path, name }) => (
						<Link key={path} to={path}>
							{name}
						</Link>
					))}
				</ul>
			</div>
			<div className="settings-content">
				<Outlet />
			</div>
		</div>
	);
}

const SETTINGS_SUBROUTES = [
	{ path: "account", name: "Account" },
	{ path: "notifications", name: "Notifications" },
];
