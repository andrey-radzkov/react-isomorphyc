import React from "react";
import PropTypes from "prop-types";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Home from "@material-ui/icons/Home";
import Basket from "@material-ui/icons/ShoppingBasket";
import {LinkMenuItem} from "./LinkMenuItem";
import Settings from "@material-ui/icons/Settings";
export const LeftMenu = ({open, onClose, onOpen}) => (

  <SwipeableDrawer open={open}
                   onClose={onClose}
                   onOpen={onOpen}>
    <LinkMenuItem onClick={onClose} leftIcon={<Home/>} to="/"
                  primaryText="Главная"/>
    <LinkMenuItem onClick={onClose} leftIcon={<Basket/>} to="/my-basket"
                  primaryText="В стирке"/>
    <LinkMenuItem onClick={onClose} leftIcon={<Settings/>} to="/settings"
                  primaryText="Настройки"/>
  </SwipeableDrawer>
);

LeftMenu.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
};
