import { connect } from "react-redux";
import Container from "./container";
import * as makersActions from "../../redux/actions/makers";

const mapStateToProps = state => ({
  targetKlay: state.makers.targetKlay,
  userAddress: state.auth.address
});

export default connect(mapStateToProps, null)(Container);
