import React from "react";
import PropTypes from "prop-types";
import {getAccessToken, logout} from "../../oauth2/TokenService";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import ExitToApp from "material-ui/svg-icons/action/exit-to-app";
import Home from "material-ui/svg-icons/action/home";
import Basket from "material-ui/svg-icons/action/shopping-basket";
import ViewList from "material-ui/svg-icons/action/view-list";
import {LinkMenuItem} from "../LinkMenuItem";
import {Link} from "react-router-dom";
import {teal600 as appBarColor} from "material-ui/styles/colors";
import {isClient} from "../../utils/ssr-util";
if (isClient()) {
  require('./header.scss');
}

const iconStyles = {
  cursor: "pointer",
};
const appBarStyle = {
  backgroundColor: appBarColor,
};


class Header extends React.Component {
//tODO: migrate to reactstrap
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div>
        {/*TODO: logo*/}
        <AppBar
          style={appBarStyle}
          title={<Link to="/" className="app-bar-link">Время стирки</Link>}
          onLeftIconButtonClick={this.handleToggle}
          iconElementRight={getAccessToken() !== null && <ExitToApp style={iconStyles} onClick={logout}/>}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <LinkMenuItem onClick={this.handleToggle} leftIcon={<Home/>} to="/" primaryText="Главная"/>
          <LinkMenuItem onClick={this.handleToggle} leftIcon={<Basket/>} to="/my-clothes" primaryText="Моя одежда"/>
          <LinkMenuItem onClick={this.handleToggle} leftIcon={<ViewList/>} to="/my-basket" primaryText="В стирке"/>
        </Drawer>
      </div>

    );
  }
}

Header.propTypes = {
  path: PropTypes.string,
};

export default Header;
