import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

export default class ContributeForm extends Component {
  state = { value: '', errorMessage: '', isLoading: false };

  onSubmit = async e => {
    e.preventDefault();
    const campaign = Campaign(this.props.address);

    this.setState({ isLoading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether'),
      });
      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (error) {
      this.setState({ errorMessage: error.message.toString().split('\n')[0] });
    }

    this.setState({ isLoading: false, value: '' });
  };
  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Contribution Amount</label>
          <Input
            placeholder="How much ether would you like to contribute?"
            label="ether"
            labelPosition="right"
            value={this.state.value}
            onChange={e => this.setState({ value: e.target.value })}
          />
        </Form.Field>
        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button
          loading={this.state.isLoading}
          color="violet"
          icon="heart"
          content="Contribute!"
        />
      </Form>
    );
  }
}
