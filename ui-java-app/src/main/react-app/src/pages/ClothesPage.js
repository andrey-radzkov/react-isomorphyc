import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addClothes, deleteClothes, loadClothes, mapClothesWithLocalization} from "../actions/clothesActions";
import {Helmet} from "react-helmet";
import List from "material-ui/List";
import ListItem from "material-ui/List/ListItem";
import ListItemAvatar from "material-ui/List/ListItemAvatar";
import Avatar from "material-ui/Avatar/Avatar";
import ListItemText from "material-ui/List/ListItemText";
import ListItemSecondaryAction from "material-ui/List/ListItemSecondaryAction";
import IconButton from "material-ui/IconButton/IconButton";
import Add from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";


class ClothesPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadClothes();
  }

  render() {
    const clothesWithLocalization = mapClothesWithLocalization(this.props.clothes);

    return (
      <div >
        <Helmet title="Моя одежда"
                meta={[
                  {"name": "description", "content": "Персональный помощник в стирке - моя одежда"},
                  {"name": "keywords", "content": "Одежда"},
                ]}
        />
        <h1>Вся моя одежда</h1>
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
                  <IconButton size="large" color="primary" aria-label="add" onClick={() => {
                    this.props.addClothes(item.type, this.props.clothes);
                  }}>
                    <Add />
                  </IconButton>
                  <IconButton aria-label="Delete" onClick={() => {
                    this.props.deleteClothes(item.type, this.props.clothes);
                  }}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>);
          })}

        </List>
      </div>
    );
  }
}

ClothesPage.propTypes = {
  loadClothes: PropTypes.func,
  deleteClothes: PropTypes.func,
  addClothes: PropTypes.func,
  clothes: PropTypes.array,
};
const mapDispatchToProps = dispatch => {
  return {
    loadClothes: () => dispatch(loadClothes()),
    deleteClothes: (type, clothes) => dispatch(deleteClothes(type, clothes)),
    addClothes: (type, clothes) => dispatch(addClothes(type, clothes)),
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
