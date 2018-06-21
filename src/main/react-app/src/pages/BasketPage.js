import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadBasket, mapClothesWithLocalization, washClothes} from "../clothes-service/clothesActions";
import {Helmet} from "react-helmet";
import {reduxForm} from "redux-form";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Autorenew from "@material-ui/icons/Autorenew";
import Button from "@material-ui/core/Button";

class BasketPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadBasket();
  }

  render() {
    const clothesWithLocalization = mapClothesWithLocalization(this.props.basket ? this.props.basket.dirtyClothes : []);

    return (
      <div className="text-center">
        <Helmet title="Корзина для стирки"
                meta={[
                  {"name": "description", "content": "Персональный помощник в стирке - корзина"},
                  {"name": "keywords", "content": "Корзина"},
                ]}
        />
        <h1>Одежда в корзине</h1>
        <form onSubmit={this.props.handleSubmit}>
          <List dense={false}>
            {/* TODO: split dirty and clean. ability to delete dirty*/}
            {clothesWithLocalization && clothesWithLocalization.length > 0 &&
            clothesWithLocalization.map(item => {
              return (
                <ListItem key={item.id} className="clothes-list">
                  <ListItemAvatar>
                    <Avatar>
                      <img src={process.env.API_URL + "/resource" + item.imgSrc} width="50px" height="50px"/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.text}/>
                  <ListItemSecondaryAction>
                    <Button aria-label="Delete" onClick={this.props.handleSubmit((values) => {
                      this.props.washClothes(item.type);
                    })}>Постирать
                      <Autorenew />
                    </Button >
                  </ListItemSecondaryAction>
                </ListItem>);
            })}

          </List>
        </form>
      </div>
    );
  }
}

BasketPage.propTypes = {
  loadBasket: PropTypes.func,
  washClothes: PropTypes.func,
  handleSubmit: PropTypes.func,
  basket: PropTypes.object,
};

BasketPage = reduxForm({
  form: 'washClothes',
  enableReinitialize: true,

})(BasketPage);

const mapDispatchToProps = dispatch => {
  return {
    loadBasket: () => dispatch(loadBasket()),
    washClothes: (type) => {
      dispatch(washClothes(type));
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
