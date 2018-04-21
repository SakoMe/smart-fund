import React, { Component, Fragment } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Router } from '../routes';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

export default class RequestRow extends Component {
  state = { isLoading: false, errorMessage: '' };
  onApprove = async () => {
    const campaign = Campaign(this.props.address);

    this.setState({ isLoading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approveRequest(this.props.id).send({
        from: accounts[0],
      });
      Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    } catch (error) {
      this.setState({ errorMessage: error.message.toString().split('\n')[0] });
    }
    this.setState({ isLoading: false });
  };

  onFinalize = async () => {
    const campaign = Campaign(this.props.address);

    this.setState({ isLoading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.finilizeRequest(this.props.id).send({
        from: accounts[0],
      });
      Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    } catch (error) {
      this.setState({ errorMessage: error.message.toString().split('\n')[0] });
    }
    this.setState({ isLoading: false });
  };

  render() {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    const readyToFinalize = request.approvalCount > approversCount / 2;

    return (
      <Row
        disabled={request.complete}
        positive={readyToFinalize && !request.complete}
      >
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {request.approvalCount}/{approversCount}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button
              loading={this.state.isLoading}
              color="green"
              basic
              onClick={this.onApprove}
            >
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button
              loading={this.state.isLoading}
              color="teal"
              basic
              onClick={this.onFinalize}
            >
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}
