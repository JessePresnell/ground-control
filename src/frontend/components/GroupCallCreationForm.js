import React from 'react';
import Relay from 'react-relay';
import {TextField, DatePicker, Paper} from 'material-ui';
import moment from "moment";
import BatchCreateGroupCallMutation from "../mutations/BatchCreateGroupCallMutation";

class GroupCallCreationForm extends React.Component {
  state = {
    topic: null,
    numCalls: null,
    fromDate: null,
    toDate: null,
    maxSignups: null
  }

  handleCreation = (event) => {
    Relay.Store.update(
      new BatchCreateGroupCallMutation({topic: this.props.store.get('topic'), numCalls: this.state.numCalls, viewer: this.props.viewer})
    );
  }

  textField(label, stateKey) {
    return (
      <TextField
        hintText={label}
        value={this.state[stateKey]}
        onChange={(e) => {
          let newState = {}
          newState[stateKey] = e.target.value;
          this.setState(newState)
        }} />
    )
  }

  render() {
    return (
      <Paper zDepth={0}>
        <form onSubmit={this.handleCreation}>
          {this.textField('Topic', 'topic')}<br />
          {this.textField('# of calls', 'numCalls')}<br />
          <DatePicker
            hintText="From date"
            mode="landscape"
            value={this.state.fromDate}
            autoOk={true} />
          <DatePicker
            hintText="To date"
            mode="landscape"
            value={this.state.toDate}
            autoOk={true} />
          {this.textField('Max signups', 'maxSignups')}<br />
        </form>
      </Paper>
    )
  }
}

export default Relay.createContainer(GroupCallCreationForm, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${BatchCreateGroupCallMutation.getFragment('viewer')},
      }
    `
  },
});