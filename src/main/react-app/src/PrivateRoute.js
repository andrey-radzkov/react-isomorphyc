import React from "react";
import PropTypes from "prop-types";

import Route from "react-router-dom/Route";
import {isAuthed, redirectToAuthService, redirectToVkAuthService} from "./services/oauth2/TokenService";
import Button from "@material-ui/core/Button";
import i18n from "./localization/i18n";
import Helmet from "react-helmet/lib/Helmet";

export const PrivateRoute = ({component: Component, ...rest}) => {
  let authed = isAuthed();


  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} /> : <div>
          {/*TODO нарисовать страничку, рефактор*/}
          <Helmet title="Время стирки - онлайн помошник"
                  meta={[
                    {
                      "name": "description",
                      "content": "Персональный помощник в стирке"
                    },
                    {"name": "keywords", "content": "Грязные носки"},
                  ]}
          />
          <h1>{i18n.t("loginH1")}</h1>
          <Button variant="raised" color="primary" onClick={redirectToAuthService} style={{"margin":"8px"}}>Тестовый логин</Button>
          <Button onClick={redirectToVkAuthService} style={{background: "#4a76a8",color:"#fff","margin":"8px","minWidth": "161px"}}>
            <img src="https://vk.com/images/svg_icons/ic_head_logo.svg" style={{"marginRight":"8px"}}/>Войти
          </Button>
        </div>
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
};
