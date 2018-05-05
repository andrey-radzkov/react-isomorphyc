import React from "react";
import Helmet from "react-helmet";
import {reduxForm} from "redux-form";
import {loadCleanClothes, mapRemainingClothesWithLocalization, putClothes} from "../actions/clothesActions";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import {ButtonList} from "../components/button-list/ButtonList";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    this.setState({busy: true});
  }

  componentDidMount() {
    this.props.loadCleanClothes()
      .then(res => this.onChange());
  }

  onChange = () => {
    this.setState({busy: false});
  };

  putClothes = (values) => {
    return this.props.putClothes(values, this.props.clothes);
  };

  render() {
    const clothesWithLocalization = mapRemainingClothesWithLocalization(this.props.clothes);

    return (
      // TODO: move from home page
      <div className="home-page">
        <Helmet title="Home page"
                meta={[
                  {"name": "description", "content": "Персональный помощник в стирке"},
                  {"name": "keywords", "content": "Гразные носки"},
                ]}
        />
        <h1>Я кладу в стирку:</h1>
        <form onSubmit={this.props.handleSubmit}>
          <ButtonList mappedClothes={clothesWithLocalization} busy={this.state.busy}
                      onSubmit={this.putClothes} handleSubmit={this.props.handleSubmit}
                      disabled={false}/>
        </form>
      </div>
    );
  }
}

HomePage.propTypes = {
  loadCleanClothes: PropTypes.func,
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
    putClothes: (values, clothes) => dispatch(putClothes(values, clothes)),
    loadCleanClothes: () => dispatch(loadCleanClothes()),
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
