import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import { Router } from '../../routes';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

export default class CampaignNew extends Component {
  state = { minimumContribution: '', errorMessage: '', isLoading: false };

  onSubmit = async e => {
    e.preventDefault();

    this.setState({ isLoading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0],
        });
      Router.pushRoute('/');
    } catch (error) {
      this.setState({ errorMessage: error.message.toString().split('\n')[0] });
    }

    this.setState({ isLoading: false });
  };

  render() {
    return (
      <Layout>
        <h2 style={{ marginTop: '3rem', marginBottom: '3rem' }}>
          Create a New Campaign
        </h2>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution for the Campaign</label>
            <Input
              placeholder="Minimum contribution for the campaign in wei..."
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={e =>
                this.setState({ minimumContribution: e.target.value })
              }
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.isLoading} primary>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}
