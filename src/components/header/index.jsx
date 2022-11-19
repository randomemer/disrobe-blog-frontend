import { Component } from "react";
import { IonIcon } from "@ionic/react";
import { bulbOutline } from "ionicons/icons";
import "./style.scss";
import { Link, Router } from "react-router-dom";

export default class AppHeader extends Component {
	render() {
		return (
			<header className="header">
				<div className="logo-el">
					<IonIcon icon={bulbOutline} />
					<span className="logo">STORIES</span>
				</div>
				<nav className="header-nav">
					<ul className="nav-items">
						<li>
							<a href="/" className="nav-link">
								Home
							</a>
						</li>
						<li>
							<a href="/posts" className="nav-link">
								Posts
							</a>
						</li>
						<li>
							<a href="/contact" className="nav-link">
								Contact
							</a>
						</li>
						<li>
							<a href="/about" className="nav-link">
								About
							</a>
						</li>
					</ul>
				</nav>
			</header>
		);
	}
}
