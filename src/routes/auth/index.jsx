/* eslint-disable no-undef */
import { Component } from "react";
import { Link } from "react-router-dom";
import "./style.scss";

function LoginForm(props) {
	return (
		<form className="auth-form">
			<div className="form-header">
				<h1>Welcome back!</h1>
			</div>

			<div className="inputs">
				<div className="input-box fill-grid-row">
					<input name="email" type="email" placeholder="Email" />
				</div>
				<div className="input-box fill-grid-row">
					<input
						className="input-box"
						autoComplete="on"
						name="password"
						type="password"
						placeholder="Password"
					/>
					<div className="password-options">
						<div className="remember-user-option">
							<input type={"checkbox"} name="remember-user" />
							<label htmlFor="remember-user">Remember Me</label>
						</div>
						<Link className="forgot-pwd-link" to="/">
							Forgot Password?
						</Link>
					</div>
				</div>
			</div>

			<button className="login-btn" type={"submit"}>
				Login
			</button>
		</form>
	);
}

function RegisterForm(props) {
	return (
		<form className="auth-form">
			<div className="form-header">
				<h1>Join us today!</h1>
				<p>Share your stories with the world.</p>
			</div>

			<div className="inputs">
				<div className="input-box">
					<input
						name="first-name"
						type="text"
						placeholder="First name"
					/>
				</div>
				<div className="input-box">
					<input
						name="last-name"
						type="text"
						placeholder="Last name"
					/>
				</div>
				<div className="input-box fill-grid-row">
					<input name="email" type="email" placeholder="Email" />
				</div>
				<div className="input-box fill-grid-row">
					<input
						autoComplete="on"
						name="password"
						type="password"
						placeholder="Password"
					/>
				</div>
			</div>

			<button className="submit-btn" type={"submit"}>
				Sign up
			</button>
		</form>
	);
}

class Auth extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tab: props.router.params.type,
		};

		this.tabIndices = {
			login: 0,
			register: 1,
		};
	}

	componentDidMount() {
		this.tabContent = document.querySelector(".form-tab-content");

		this.tabs = document.querySelectorAll(".form-tab-content li");

		this.switchTabs(this.state.tab);
	}

	switchTabs(tab) {
		const timeline = gsap.timeline();
		const tabIndex = this.tabIndices[tab];

		const previous = this.tabs[this.tabIndices[this.state.tab]];
		const current = this.tabs[tabIndex];

		const tabLength = 100 / this.tabs.length;
		gsap.to(".line", {
			ease: "expo.out",
			left: `${tabIndex * tabLength}%`,
		});

		// fade out active tab
		timeline.to(previous, {
			opacity: 0,
			duration: 0.05,
			onComplete: () => {
				// remove active class from all tabs
				for (const tab of this.tabs) {
					tab.classList.remove("active-tab-content");
				}
				// add active class to current tab
				current.classList.add("active-tab-content");
			},
		});

		// // animate height of container
		// timeline.to(this.tabContent, {
		// 	height: current.offsetHeight,
		// 	onComplete: () => console.log("done"),
		// });

		// fade in current tab
		timeline.to(current, { opacity: 1, onComplete: () => {} });
	}

	componentWillUnmount() {}

	componentDidUpdate(prevProps) {
		const prevTab = prevProps.router.params.type;
		const curTab = this.props.router.params.type;

		if (prevTab !== curTab) {
			this.setState({ tab: curTab });
			this.switchTabs(curTab);
		}
	}

	render() {
		return (
			<div className="form-container">
				<ul className="form-tabs">
					<li>
						<Link to="/auth/login">Login</Link>
					</li>
					<li>
						<Link to="/auth/register">Register</Link>
					</li>
					<div className="line"></div>
				</ul>

				<ul className="form-tab-content">
					<li className="login active-tab-content">
						<LoginForm />
					</li>
					<li className="register">
						<RegisterForm />
					</li>
				</ul>
			</div>
		);
	}
}

export default Auth;
