import React from "react";
import PropTypes from "prop-types";
import SwipeableDrawer from "material-ui/SwipeableDrawer";
import Home from "@material-ui/icons/Home";
import Basket from "@material-ui/icons/ShoppingBasket";
import ViewList from "@material-ui/icons/ViewList";
import {LinkMenuItem} from "./LinkMenuItem";
export const LeftMenu = ({open, onClose, onOpen}) => (

  <SwipeableDrawer open={open}
                   onClose={onClose}
                   onOpen={onOpen}>
    <LinkMenuItem onClick={onClose} leftIcon={<Home/>} to="/"
                  primaryText="Главная"/>
    <LinkMenuItem onClick={onClose} leftIcon={<ViewList/>} to="/my-clothes"
                  primaryText="Моя одежда"/>
    <LinkMenuItem onClick={onClose} leftIcon={<Basket/>} to="/my-basket"
                  primaryText="В стирке"/>
  </SwipeableDrawer>
);

LeftMenu.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
};
