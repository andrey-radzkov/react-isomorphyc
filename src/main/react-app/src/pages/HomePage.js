import React from "react";
import Helmet from "react-helmet";
import {addQuickNote, loadNoteTypes} from "../services/clothes-service/clothesActions";
import connect from "react-redux/lib/connect/connect";
import PropTypes from "prop-types";
import QuickTasksList from "../components/button-list/QuickTasksList";
import {FULL_PAGE_WAITING_ID} from "../services/modal-waiting-service/componentStateActions";
import {WaitingLayer} from "../components/app-common/WaitingLayer";
import FirebaseMessaging from "../services/push-notification/FirebaseMessaging";
import FriendsDialog from "../components/FriendsDialog";
import reduxForm from "redux-form/lib/reduxForm";

const mapDispatchToProps = dispatch => {
  return {
    addQuickNote: (type, receiver) => dispatch(addQuickNote(type, receiver)),
    loadNoteTypes: () => dispatch(loadNoteTypes()),
    dispatch: (func) => dispatch(func),
  };
};
const mapStateToProps = (state) => {
  return {
    clothesTypes: state.clothesReducer.clothesTypes,
    showWaiting: state.ajaxActionsReducer[FULL_PAGE_WAITING_ID]
  };
};
// TODO: migrate all to pure component
@connect(mapStateToProps, mapDispatchToProps)
@reduxForm({
  form: 'addNotification',
  enableReinitialize: true,
})
export default class HomePage extends React.Component {

  static propTypes = {
    loadNoteTypes: PropTypes.func.isRequired,
    addQuickNote: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
    reset: PropTypes.func,
    dispatch: PropTypes.func,
    invalid: PropTypes.bool,
    showWaiting: PropTypes.bool,
    clothesTypes: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      showContent: false,
    };
    this.firebaseMessaging = new FirebaseMessaging();

  }


  componentDidMount() {
    this.props.loadNoteTypes();
    this.props.dispatch(this.firebaseMessaging.subscribe());
  }

  addQuickNote = (type, receiver) => {
    return this.props.addQuickNote(type, receiver);
  };
  handleClose = () => {
    this.closeDialog();
  };
  closeDialog = () => {
    this.setState({open: false});
  };

  handleOK = (receiver) => {
    this.closeDialog();
    this.addQuickNote(this.state.type, receiver);
  };

  render() {

    return (
      // TODO: move from home page
      <div className="text-center">
        <Helmet title="Время стирки - Онлайн помошник"
                meta={[
                  {
                    "name": "description",
                    "content": "Персональный помощник в стирке"
                  },
                  {"name": "keywords", "content": "Грязные носки"},
                ]}
        />
        <h1>Мои вещи:</h1>
        <FriendsDialog open={this.state.open}
                       handleOk={(receiver) => this.handleOK(receiver)}
                       handleCancel={this.handleClose}
                       title={"Выберите получателя"}
        />
        <QuickTasksList actionTypes={this.props.clothesTypes}
                        onClick={(type) => this.setState({open: true, type: type})}
                        disabled={false}
        />
        <WaitingLayer showWaiting={this.props.showWaiting}
                      waitingId={FULL_PAGE_WAITING_ID}/>
      </div>
    );
  }
}
