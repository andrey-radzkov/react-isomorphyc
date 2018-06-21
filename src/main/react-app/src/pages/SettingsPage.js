import React from "react";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";
import PropTypes from "prop-types";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Field, formValueSelector, reduxForm} from "redux-form";
import {
  loadSettings,
  revertReceiver,
  revertSenders,
  saveReceiver,
  saveSenders,
  saveSettings
} from "../settings-service/settingsActions";
import {WaitingLayer} from "../components/app-common/WaitingLayer";
import {FULL_PAGE_WAITING_ID} from "../actions/componentStateActions";
import FirebaseMessaging from "../push/FirebaseMessaging";
import Button from "@material-ui/core/Button/Button";
import {ReduxFormRadioGroup} from "../components/redux-form/ReduxFormRadioGroup";
import Radio from "@material-ui/core/Radio/Radio";
import {FriendsDialog} from "../components/FriendsDialog";

const selector = formValueSelector('settingsForm');


class SettingsPage extends React.Component {

  constructor(props) {
    super(props);
    this.firebaseMessaging = new FirebaseMessaging();
    this.state = {
      open: false,
      showContent: false,
    };
  }

  componentDidMount() {
    this.props.loadSettings().then(() => this.setState({showContent: true}));
  }

  handleClose = () => {
    this.closeDialog();
    if (this.props.type === 'receiver') {
      this.props.revertSenders();
    } else if (this.props.type === 'sender') {
      this.props.revertReceiver();
    }
  };

  handleOK = () => {
    this.closeDialog();
    if (this.props.type === 'receiver') {
      this.props.saveSenders(this.props.senders);
    } else if (this.props.type === 'sender') {
      this.props.saveReceiver(this.props.receiver);
    }
  };

  closeDialog = () => {
    this.setState({open: false});
  };

  subscribe(type) {
    //Todo: notify iser if not subscribed.
    if (type === 'receiver') {
      this.props.dispatch(this.firebaseMessaging.subscribe());
    }
  }

  render() {
    let SelectButton = ({text}) => (
      <Button variant="raised" color="secondary"
              onClick={() => this.setState({open: true})}>
        {text}
      </Button>
    );
    const {handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <div className="text-center">

        <Helmet title="Home page"
                meta={[
                  {"name": "description", "content": "Настройки"},
                  {"name": "keywords", "content": "Настройки"},
                ]}
        />
        <h1>Настройки</h1>
        {/*TODO: extract to component*/}
        {this.state.showContent &&
        <div>
          <h3>Я хочу:</h3>
          {/*TODO: handle no options*/}
          <form onSubmit={handleSubmit(this.props.saveSettings)}>
            <Field name="id" id="settings-id" component="input" type="hidden"/>

            <Field name="type" submitOnChange={handleSubmit((values) => {
              this.subscribe(values.type);
              this.props.saveSettings(values);
            })} component={ReduxFormRadioGroup}
                   style={{flexDirection: "row", marginLeft: 16}}>
              <FormControlLabel value="sender" control={<Radio/>}
                                label="Отправлять"/>
              <FormControlLabel value="receiver" control={<Radio/>}
                                label="Получать"/>
            </Field>


          </form>
          <div style={{margin: "8px"}}>уведомления о том, что чистые вещи
            заканчиваются и пора стирать
          </div>
          {this.props.type === 'sender' &&
          <SelectButton text="Выбрать получателя"/>
          }
          {this.props.type === 'receiver' &&
          <SelectButton text="Выбрать отправителей"/>
          }
          <FriendsDialog open={this.state.open}
                         handleOk={this.handleOK}
                         handleCancel={this.handleClose}
                         multipleSelect={this.props.type === 'receiver'}
                         title={"Выберите " + (this.props.type === 'sender'
                           ? 'получателя' : "отправителей")}
          />

        </div>
        }
        <WaitingLayer showWaiting={this.props.showWaiting}
                      waitingId={FULL_PAGE_WAITING_ID}/>

      </div>
    );
  }

}

SettingsPage.propTypes = {
  pristine: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func,
  loadSettings: PropTypes.func,
  saveSettings: PropTypes.func,
  saveReceiver: PropTypes.func,
  revertReceiver: PropTypes.func,
  saveSenders: PropTypes.func,
  revertSenders: PropTypes.func,
  dispatch: PropTypes.func,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  showWaiting: PropTypes.bool,
  type: PropTypes.string,
  senders: PropTypes.array,
  receiver: PropTypes.number,

};

SettingsPage = reduxForm({
  form: 'settingsForm',
  enableReinitialize: true,
})(SettingsPage);

const mapDispatchToProps = dispatch => {
  return {
    loadSettings: () => dispatch(loadSettings()),
    saveSettings: (values) => dispatch(saveSettings(values)),
    saveReceiver: (id) => dispatch(saveReceiver(id)),
    revertReceiver: () => dispatch(revertReceiver()),
    saveSenders: (ids) => dispatch(saveSenders(ids)),
    revertSenders: () => dispatch(revertSenders()),
  };
};

const mapStateToProps = (state) => {
  return {
    type: selector(state, 'type'),
    initialValues: state.settingsReducer.userSettings,
    receiver: state.settingsReducer.receiver,
    senders: state.settingsReducer.senders,
    showWaiting: state.ajaxActionsReducer[FULL_PAGE_WAITING_ID]

  };
};

SettingsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);

export default SettingsPage;
