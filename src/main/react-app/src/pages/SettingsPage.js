import React from "react";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class SettingsPage extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
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
        <FormControlLabel
          control={
            <Checkbox
              checked={true}
              color="primary"
            />
          }
          label="Получать"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={true}
              color="primary"
            />
          }
          label="Отправлять"
        />
        <div>уведомления о том, что чистые вещи заканчиваются и пора стирать</div>
      </div>
    );
  }

}

SettingsPage.propTypes = {};

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

export default SettingsPage;
