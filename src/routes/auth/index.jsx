/* eslint-disable no-undef */
import { Component } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import RegisterForm from "./register";
import LoginForm from "./login";
// import { delay } from "utils";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

class Auth extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tab: props.router.params.type,
			isProcessing: false,
		};

		this.tabIndices = {
			login: 0,
			register: 1,
		};
	}

	componentDidMount() {
		this.tabContent = document.querySelector(".form-tab-content");
		this.tabs = document.querySelectorAll(".form-tab-content li");

		this.resizeObserver = new ResizeObserver((entries) => {
			this.adjustFormHeight(entries);
		});

		this.switchTabs(this.state.tab);
	}

	registerUser = async (data) => {
		this.setState({ isProcessing: true });
		try {
			console.log(data);
			const auth = getAuth();
			const credentials = await createUserWithEmailAndPassword(
				auth,
				data.email,
				data.password
			);
			console.log(credentials);
		} catch (error) {
			console.error(error);
		}
		this.setState({ isProcessing: false });
	};

	switchTabs(tab) {
		const timeline = gsap.timeline();

		const tabIndex = this.tabIndices[tab];
		const previous = this.getTabByName(this.state.tab);
		const current = this.getTabByName(tab);

		// un-observe previously active form
		this.resizeObserver.unobserve(previous.querySelector("form"));

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

		const form = current.querySelector("form");
		// animate height of container
		timeline.to(this.tabContent, {
			height: form.offsetHeight,
			onComplete: () => {
				// observer for the current form to animate height changes
				this.resizeObserver.observe(form);
			},
		});

		// fade in current tab
		timeline.to(current, { opacity: 1, duration: 0.15 });
	}

	adjustFormHeight(entries) {
		const form = this.currentForm();
		const entry = entries.find((entry) => entry.target === form);
		if (!entry) return;
		// console.log(entry);
		gsap.to(this.tabContent, {
			height: entry.borderBoxSize[0].blockSize,
			ease: "expo.out",
			duration: 0.3,
		});
	}

	componentWillUnmount() {
		this.resizeObserver.disconnect();
	}

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
						<RegisterForm
							register={this.registerUser}
							loading={this.state.isProcessing}
						/>
					</li>
				</ul>
			</div>
		);
	}

	// helpers
	getTabByName(name) {
		return this.tabs[this.tabIndices[name]];
	}

	currentTab() {
		return this.tabs[this.tabIndices[this.state.tab]];
	}

	currentForm() {
		const tab = this.currentTab();
		return tab.querySelector("form");
	}
}

export default Auth;
