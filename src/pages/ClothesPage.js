import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadClothes, mapRemainingClothesWithLocalization} from "../actions/clothesActions";
import {Helmet} from "react-helmet";

class ClothesPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadClothes();
  }

  render() {
    const clothesWithLocalization = mapRemainingClothesWithLocalization(this.props.clothes);

    let clothess = JSON.stringify(clothesWithLocalization);//TODO: table with form
    return (
      <div className="container">
        <Helmet title="Моя одежда"
                meta={[
                  {"name": "description", "content": "Персональный помощник в стирке - моя одежда"},
                  {"name": "keywords", "content": "Одежда"},
                ]}
        />
        <h1>Моя одежда</h1>
        {clothess}
      </div>
    );
  }
}

ClothesPage.propTypes = {
  loadCleanClothes: PropTypes.func,
  clothes: PropTypes.array,
};
const mapDispatchToProps = dispatch => {
  return {
    loadClothes: () => dispatch(loadClothes()),
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
