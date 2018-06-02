import React from "react";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";
import PropTypes from "prop-types";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Field, formValueSelector, reduxForm} from "redux-form";
import {loadSettings, saveSettings} from "../actions/settingsActions";
import {WaitingLayer} from "../components/WaitingLayer";
import {FULL_PAGE_WAITING_ID} from "../actions/componentStateActions";
import FirebaseMessaging from "../push/FirebaseMessaging";
import FriendsList from "../components/vk/FriendsList";
import Button from "@material-ui/core/Button/Button";
import {ReduxFormRadioGroup} from "../components/ReduxFormRadioGroup";
import Radio from "@material-ui/core/Radio/Radio";
const selector = formValueSelector('settingsForm');


class SettingsPage extends React.Component {

  constructor(props) {
    super(props);
    this.firebaseMessaging = new FirebaseMessaging();
  }

  componentDidMount() {
    this.props.loadSettings();
  }

  subscribe(receiver) {
    if (receiver) {
      this.props.dispatch(this.firebaseMessaging.subscribe());
    }
  }

  render() {
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
        {!this.props.showWaiting &&
        <div>
          <h3>Я хочу:</h3>
          {/*TODO: handle no options*/}
          <form onSubmit={handleSubmit(this.props.saveSettings)}>
            <Field name="id" id="settings-id" component="input" type="hidden"/>

            <Field name="type" submitOnChange={handleSubmit(this.props.saveSettings)}
                   component={ReduxFormRadioGroup}>
              <FormControlLabel value="sender" control={<Radio/>} label="Отправлять"/>
              <FormControlLabel value="receiver" control={<Radio/>} label="Получать"/>
            </Field>


          </form>
          <div>уведомления о том, что чистые вещи заканчиваются и пора стирать</div>
          {this.props.type === 'sender' &&
          <Button variant="raised" color="secondary">
            Выбрать получателя
          </Button>}
          {this.props.type === 'receiver' &&
          <Button variant="raised" color="secondary">
            Выбрать отправителей
          </Button>}
          <FriendsList render={this.props.type === 'receiver'}/>
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
  dispatch: PropTypes.func,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  showWaiting: PropTypes.bool,
  type: PropTypes.string,

};

SettingsPage = reduxForm({
  form: 'settingsForm',
  enableReinitialize: true,
})(SettingsPage);

const mapDispatchToProps = dispatch => {
  return {
    loadSettings: () => dispatch(loadSettings()),
    saveSettings: (values) => dispatch(saveSettings(values)),
  };
};

const mapStateToProps = (state) => {
  return {
    type: selector(state, 'type'),
    initialValues: state.settingsReducer.userSettings,
    showWaiting: state.ajaxActionsReducer[FULL_PAGE_WAITING_ID]

  };
};

SettingsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);

export default SettingsPage;
