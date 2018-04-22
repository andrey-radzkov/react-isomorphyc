import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadClothes} from "../actions/clothesActions";
import {Helmet} from "react-helmet";

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
        <Helmet title="Моя одежда"
                meta={[
                  {"name": "description", "content": "Персональный помощник в стирке - моя одежда"},
                  {"name": "keywords", "content": "Одежда"},
                ]}
        />
        <h1>Моя одежда</h1>
        {clothes}
      </div>
    );
  }
}

ClothesPage.propTypes = {
  loadClothes: PropTypes.func,
  clothes: PropTypes.array,
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
    clothes: state.clothesReducer.clothes
  };
};

ClothesPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClothesPage);

export default ClothesPage;
