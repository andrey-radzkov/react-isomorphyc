import React from "react";
import Button from "react-bootstrap/lib/Button";

import {messaging, sendNotification, subscribe} from "../push/firebasePushMessagesActions";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";

class PushNotificationsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({subscribed: null});
    messaging.getToken().then(token => {
      if (token) {
        this.subscribed(true);
      } else {
        this.subscribed(false);
      }
    }).catch((err) => {
      this.subscribed(null);
    });
  }

  subscribed = (subcsribed) => {
    this.setState({subscribed: subcsribed});
  };

  subscribeAction = () => {
    subscribe(this.subscribed);
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
          <Button onClick={sendNotification} bsStyle="primary" disabled={!this.state.subscribed}>Send
            notification</Button>
        </ButtonToolbar>
        <div id="messages"/>

      </div>
    );
  }
}


export default PushNotificationsPage;
