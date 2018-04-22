import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadClothes} from "../actions/clothesActions";

class ClothesPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadClothes();
  }

  render() {
    let clothes = JSON.stringify(this.props.clothes);//TODO: table with form
    return (
      <div className="container">
        <h1>Моя одежда</h1>
        {clothes}
      </div>
    );
  }
}

ClothesPage.propTypes = {
  loadClothes: PropTypes.func,
  clothes: PropTypes.object,
};
const mapDispatchToProps = dispatch => {
  return {
    loadClothes: () => {
      dispatch(loadClothes());
    },
  };
};
const mapStateToProps = (state) => {
  return {
    clothes: state.clothesListReducer.clothes
  };
};

ClothesPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClothesPage);

export default ClothesPage;
