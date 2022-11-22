import { Component } from "react";
import EditForm from "./edit-form";
import { connect } from "react-redux";
import "./style.scss";

class Account extends Component {
	render() {
		if (this.props.userProfile.status === "fulfilled") {
			return (
				<div>
					<EditForm profile={this.props.userProfile.value} />
				</div>
			);
		} else {
			<></>;
		}
	}
}

const mapStateToProps = (state) => ({ userProfile: state["user-profile"] });

export default connect(mapStateToProps, null)(Account);
