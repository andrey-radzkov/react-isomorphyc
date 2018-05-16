import React from "react";
import Helmet from "react-helmet";
import {reduxForm} from "redux-form";
import {loadClothesTypesWithCount, putClothesToBasket} from "../actions/clothesActions";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import ClothesList from "../components/button-list/ClothesList";
import {CLOTHES_TYPES_WAITING_ID} from "../actions/componentStateActions";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editMode: false};
  }


  componentDidMount() {
    this.props.loadClothesTypesWithCount();
  }

  putClothesToBasket = (values) => {
    return this.props.putClothesToBasket(values);
  };

  toggleEditMode = () => {
    this.setState({editMode: !this.state.editMode});
  };

  render() {

    return (
      // TODO: move from home page
      <div className="home-page">
        <Helmet title="Home page"
                meta={[
                  {"name": "description", "content": "Персональный помощник в стирке"},
                  {"name": "keywords", "content": "Гразные носки"},
                ]}
        />
        <h1>Мои вещи:</h1>
        <form onSubmit={this.props.handleSubmit}>
          <ClothesList clothesTypesWithCount={this.props.clothesTypes}
                       onSubmit={this.putClothesToBasket} handleSubmit={this.props.handleSubmit}
                       disabled={false}
                       showWaiting={this.props.showWaiting} editMode={this.state.editMode}
                       onEditClick={this.toggleEditMode}/>
        </form>
      </div>
    );
  }
}

HomePage.propTypes = {
  loadClothesTypesWithCount: PropTypes.func.isRequired,
  putClothesToBasket: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  showWaiting: PropTypes.bool,
  clothesTypes: PropTypes.array,
};

HomePage = reduxForm({
  form: 'putClothes',
  enableReinitialize: true,

})(HomePage);

const mapDispatchToProps = dispatch => {
  return {
    putClothesToBasket: (values) => dispatch(putClothesToBasket(values)),
    loadClothesTypesWithCount: () => dispatch(loadClothesTypesWithCount()),
  };
};
const mapStateToProps = (state) => {
  return {
    clothesTypes: state.clothesReducer.clothesTypes,
    showWaiting: state.ajaxActionsReducer[CLOTHES_TYPES_WAITING_ID]
  };
};

HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
export default HomePage;
