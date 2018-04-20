import React, { Component } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import { Link, Router } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import Layout from '../../../components/Layout';

export default class RequestNew extends Component {
  state = {
    value: '',
    description: '',
    recipient: '',
    isLoading: false,
    errorMessage: '',
  };

  static async getInitialProps(props) {
    const { address } = props.query;

    return { address };
  }

  onSubmit = async e => {
    e.preventDefault();

    const campaign = Campaign(this.props.address);
    const { description, value, recipient } = this.state;

    this.setState({ isLoading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({ from: accounts[0] });

      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (error) {
      this.setState({ errorMessage: error.message.toString().split('\n')[0] });
    }

    this.setState({ isLoading: false });
  };

  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>Back</a>
        </Link>
        <h2 style={{ marginTop: '3rem', marginBottom: '3rem' }}>
          Create a New Request
        </h2>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              placeholder="Description of proposed expense"
              value={this.state.description}
              onChange={e => this.setState({ description: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Value in Ether</label>
            <Input
              placeholder="The amount in ether for the proposed expense"
              value={this.state.value}
              onChange={e => this.setState({ value: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient Address</label>
            <Input
              placeholder="Address of recipient / contractor"
              value={this.state.recipient}
              onChange={e => this.setState({ recipient: e.target.value })}
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary loading={this.state.isLoading}>
            Request
          </Button>
        </Form>
      </Layout>
    );
  }
}
