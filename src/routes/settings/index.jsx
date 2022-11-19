import AppHeader from "@/components/header";
import { Component } from "react";
import { Link, Outlet } from "react-router-dom";
import "./style.scss";

export default class Settings extends Component {
	constructor(props) {
		super(props);
		console.log(props);
	}

	componentDidMount() {
		this.links = document.querySelector(".settings-links");

		this.highlightLink();
	}

	componentDidUpdate() {
		this.highlightLink();
	}

	highlightLink() {
		const { location } = this.props.router;

		const anchor = this.links.querySelector(
			`a[href="${location.pathname}"]`
		);
		console.log(anchor);

		console.log(JSON.stringify(anchor, Object.getOwnPropertyNames(anchor)));
	}

	render() {
		return (
			<>
				<AppHeader />
				<div className="settings-container">
					<div className="settings-side-nav">
						<div className="active-link-line"></div>
						<ul className="settings-links">
							<Link to="/settings/profile">Profile</Link>
							<Link to="/settings/account">Account</Link>
							<Link to="/settings/posts">Posts</Link>
							<Link to="/settings/notifications">
								Notifications
							</Link>
						</ul>
					</div>
					<div className="settings-content">
						<Outlet />
					</div>
				</div>
			</>
		);
	}
}
