import React from "react";
import Helmet from "react-helmet";
import {Field, reduxForm} from "redux-form";
import {loadClothes, mapRemainingClothesWithLocalization, putClothes} from "../actions/clothesActions";
import Button from "react-bootstrap/lib/Button";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import DropdownListRedux from "../components/DropdownListRedux";
import {required} from "../validators/validatorsForFormat";
import isEmpty from "lodash/isEmpty";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    this.setState({busy: true});
  }

  componentDidMount() {
    this.props.loadClothes()
      .then(res => this.onChange());
  }

  onChange = () => {
    this.setState({busy: false});
  };

  render() {
    return (
      // TODO: move from home page
      <div className="container text-center">
        <Helmet title="Home page"
                meta={[
                  {"name": "description", "content": "Персональный помощник в стирке"},
                  {"name": "keywords", "content": "Гразные носки"},
                ]}
        />
        <h1>Положите вещь в стирку</h1>
        <form className="form-horizontal" onSubmit={this.props.handleSubmit(this.props.putClothes)}>
          {/*//TODO: select data from server, default value from redux*/}

          <Field name="type"
                 component={DropdownListRedux}
                 data={mapRemainingClothesWithLocalization(this.props.clothes)}
                 valueField="type"
                 textField="text"
                 busy={this.state.busy}
                 messages={{emptyList: "Нет чистых вещей", open: "Открыть"}}
                 validate={[required]}
          />
          <Button bsStyle="success" className="submitClothes" type="submit" disabled={this.props.submitting}>В
            стирку!</Button>
        </form>
      </div>
    );
  }
}

HomePage.propTypes = {
  loadClothes: PropTypes.func,
  putClothes: PropTypes.func,
  pristine: PropTypes.bool,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  clothes: PropTypes.array,
};

HomePage = reduxForm({
  form: 'putClothes',
  enableReinitialize: true,

})(HomePage);

const mapDispatchToProps = dispatch => {
  return {
    putClothes: (values) => dispatch(putClothes(values)),
    loadClothes: () => dispatch(loadClothes()),
  };
};
const mapStateToProps = (state) => {
  return {
    initialValues: isEmpty(state.clothesReducer.clothes) ? null : {"type": mapRemainingClothesWithLocalization(state.clothesReducer.clothes)[0]},
    clothes: state.clothesReducer.clothes
  };
};

HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

export default HomePage;
