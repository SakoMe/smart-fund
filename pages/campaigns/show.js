import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import { Link } from '../../routes';
import Layout from '../../components/Layout';
import ContributeForm from '../../components/ContributeForm';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';

export default class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.address,
      minimumContribution: summary[0],
      campaignBalance: summary[1],
      requestCount: summary[2],
      approversCount: summary[3],
      managerAddress: summary[4],
    };
  }

  renderCampaignSummary() {
    const {
      minimumContribution,
      campaignBalance,
      requestCount,
      approversCount,
      managerAddress,
    } = this.props;

    const items = [
      {
        header: managerAddress,
        meta: 'Address of Campaign Manager',
        description:
          'The Manager is the Campaign Creator and can make requests for funds to be withdrawn from Campaign',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description:
          'You must contribute at least this much wei to become an approver',
      },
      {
        header: requestCount,
        meta: 'Number of Requests',
        description:
          'A request tries to withdraw money from the contract. Requests must be approved by approvers',
      },
      {
        header: approversCount,
        meta: 'Number of Contributors',
        description:
          'Number of people who have already donated to this campaign',
      },
      {
        header: web3.utils.fromWei(campaignBalance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description:
          'The balance is how much money this campaign has left to spend.',
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3 style={{ marginTop: '3rem' }}>Campaign Details</h3>
        <Grid>
          <Grid.Column width={10}>
            {this.renderCampaignSummary()}
            <Link route={`/campaigns/${this.props.address}/requests`}>
              <a>
                <Button primary>Requests</Button>
              </a>
            </Link>
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={this.props.address} />
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}
