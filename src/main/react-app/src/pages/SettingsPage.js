import React from "react";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";
import PropTypes from "prop-types";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Field, reduxForm} from "redux-form";
import {ReduxFormCheckbox} from "../components/ReduxFormCheckbox";
import {loadSettings, saveSettings} from "../actions/settingsActions";
import {WaitingLayer} from "../components/WaitingLayer";
import {FULL_PAGE_WAITING_ID} from "../actions/componentStateActions";

class SettingsPage extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadSettings();
  }

  render() {
    const {handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <div className="home-page">

        <Helmet title="Home page"
                meta={[
                  {"name": "description", "content": "Настройки"},
                  {"name": "keywords", "content": "Настройки"},
                ]}
        />
        <h1>Настройки</h1>
        {/*TODO: extract to component*/}
        {!this.props.showWaiting &&
        <div><h3>Я хочу:</h3>

          <form onSubmit={handleSubmit(this.props.saveSettings)}>
            <Field name="id" id="settings-id" component="input" type="hidden"/>
            <FormControlLabel
              control={
                <Field name="receiver" submitOnChange={handleSubmit(this.props.saveSettings)}
                       component={ReduxFormCheckbox}/>
              }
              label="Получать"
            />
            <FormControlLabel
              control={
                <Field name="sender" submitOnChange={handleSubmit(this.props.saveSettings)}
                       component={ReduxFormCheckbox}/>
              }
              label="Отправлять"
            />
          </form>
          <div>уведомления о том, что чистые вещи заканчиваются и пора стирать</div>
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
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  showWaiting: PropTypes.bool,

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
    initialValues: state.settingsReducer.userSettings,
    showWaiting: state.ajaxActionsReducer[FULL_PAGE_WAITING_ID]

  };
};

SettingsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);

export default SettingsPage;
