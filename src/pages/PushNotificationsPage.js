import React from "react";
import Button from "react-bootstrap/lib/Button";

import FirebaseMessaging from "../push/FirebaseMessaging";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import {isClient} from "../utils/ssr-util";

class PushNotificationsPage extends React.Component {
  constructor(props) {
    super(props);
    this.firebaseMessaging = {};
    if (isClient()) {
      this.firebaseMessaging = new FirebaseMessaging();
    }
  }

  componentWillMount() {
    this.setState({subscribed: null});
    if (isClient()) {

      this.firebaseMessaging.getMessaging().getToken().then(token => {
        if (token) {
          this.subscribed(true);
        } else {
          this.subscribed(false);
        }
      }).catch((err) => {
        this.subscribed(null);
      });
    }
  }

  subscribed = (subcsribed) => {
    this.setState({subscribed: subcsribed});
  };

  subscribeAction = () => {
    this.firebaseMessaging.subscribe(this.subscribed);
  };


  render() {
    let subscribeText = this.state.subscribed === true ? 'You are already subscribed' : this.state.subscribed === false ? 'Subscribe' : 'You blocked subscription';
    return (
      <div className="container">
        <h2 className="alt-header">Push notifications</h2>
        <ButtonToolbar>
          <Button className="js-push-button" onClick={this.subscribeAction} bsStyle="default"
                  disabled={this.state.subscribed === true || this.state.subscribed === null}>
            {this.state.subscribed === false &&
            <span className="glyphicon glyphicon-bell bell" aria-hidden="true"/>
            }
            {subscribeText}</Button>
          <Button onClick={this.firebaseMessaging.sendNotification} bsStyle="primary" disabled={!this.state.subscribed}>Send
            to
            current</Button>
          <Button onClick={this.firebaseMessaging.sendNotificationToAll} bsStyle="primary"
                  disabled={!this.state.subscribed}>Send to
            all</Button>
        </ButtonToolbar>
        <div id="messages"/>

      </div>
    );
  }
}


export default PushNotificationsPage;
