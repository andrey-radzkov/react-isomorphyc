import React from "react";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";
import PropTypes from "prop-types";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Field, reduxForm} from "redux-form";
import {ReduxFormCheckbox} from "../components/ReduxFormCheckbox";


class SettingsPage extends React.Component {

  constructor(props) {
    super(props);
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
        <h3>Я хочу:</h3>
        <form onSubmit={handleSubmit}>
          <FormControlLabel
            control={
              <Field name="receive" component={ReduxFormCheckbox}/>
            }
            label="Получать"
          />
          <FormControlLabel
            control={
              <Field name="send" component={ReduxFormCheckbox}/>
            }
            label="Отправлять"
          />
        </form>
        <div>уведомления о том, что чистые вещи заканчиваются и пора стирать</div>
      </div>
    );
  }

}

SettingsPage.propTypes = {
  pristine: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
};

const mapDispatchToProps = dispatch => {
  return {};
};

const mapStateToProps = (state) => {
  return {};
};

SettingsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);

export default reduxForm({
  form: 'settingsForm',
  enableReinitialize: true,
})(SettingsPage);
