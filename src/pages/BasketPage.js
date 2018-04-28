import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadBasket, washClothes} from "../actions/clothesActions";
import Button from "react-bootstrap/lib/Button";
import {Helmet} from "react-helmet";
import {reduxForm} from "redux-form";

class BasketPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadBasket();
  }

  render() {
    let basket = JSON.stringify(this.props.basket);//TODO: table with form
    return (
      <div className="container">
        <div className="text-center">
          <Helmet title="Корзина для стирки"
                  meta={[
                    {"name": "description", "content": "Персональный помощник в стирке - корзина"},
                    {"name": "keywords", "content": "Корзина"},
                  ]}
          />
          <h1>Одежда в корзине</h1>
          {basket}
          <form className="form-horizontal" onSubmit={this.props.washClothes}>
            {/*TODO: разделить по правам - кто то уведомляет кто то стирает. так же добавиьт уведомление по вещам*/}
            <Button bsStyle="success" className="submitClothes" type="submit">Постирать</Button>
          </form>
        </div>
      </div>
    );
  }
}

BasketPage.propTypes = {
  loadBasket: PropTypes.func,
  washClothes: PropTypes.func,
  basket: PropTypes.object,
};

BasketPage = reduxForm({
  form: 'washClothes',
  enableReinitialize: true,

})(BasketPage);

const mapDispatchToProps = dispatch => {
  return {
    loadBasket: () => dispatch(loadBasket()),
    washClothes: (e) => {
      dispatch(washClothes(e));
    }
  };
};
const mapStateToProps = (state) => {
  return {
    basket: state.clothesReducer.basket
  };
};

BasketPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(BasketPage);

export default BasketPage;
