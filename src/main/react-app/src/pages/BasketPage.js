import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadBasket, mapClothesWithLocalization, washClothes} from "../actions/clothesActions";
import {Helmet} from "react-helmet";
import {reduxForm} from "redux-form";
import List from "material-ui/List";
import ListItem from "material-ui/List/ListItem";
import ListItemAvatar from "material-ui/List/ListItemAvatar";
import Avatar from "material-ui/Avatar/Avatar";
import ListItemText from "material-ui/List/ListItemText";
import ListItemSecondaryAction from "material-ui/List/ListItemSecondaryAction";
import IconButton from "material-ui/IconButton/IconButton";
import Delete from "@material-ui/icons/Delete";


class BasketPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadBasket();
  }

  render() {
    const clothesWithLocalization = mapClothesWithLocalization(this.props.basket?this.props.basket.dirtyClothes:[]);

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
          <form className="form-horizontal" onSubmit={this.props.handleSubmit}>
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
                      <IconButton aria-label="Delete" onClick={this.props.handleSubmit((values) => {
                        this.props.deleteClothes(item.type, this.props.clothes);
                      })}>
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>);
              })}

            </List>
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
