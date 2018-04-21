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
        meta: "Manager's Address on the Blockchain",
        description:
          'The Manager is the creator of this campaign. However before spending any funds he/she must ask for the approval of proposed expeditures...',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description:
          'Minimum contirbution required by this campaign in wei. All contributors will have the power to approve expenditure requests...',
      },
      {
        header: requestCount,
        meta: 'Number of Requests',
        description:
          'A request tries to withdraw money from the contract. All requests must be approved by at least 50% of all contributors...',
      },
      {
        header: approversCount,
        meta: 'Number of Contributors',
        description:
          'Total number of people who have contributed to this campaign',
      },
      {
        header: web3.utils.fromWei(campaignBalance, 'ether'),
        meta: 'Current Balance (ether)',
        description:
          'The current balance is how much money this campaign has left to spend in ether.',
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h2 style={{ marginTop: '3rem', marginBottom: '3rem' }}>
          Campaign Details
        </h2>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCampaignSummary()}</Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button color="violet" icon="eye" content="View Requests" />
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}
