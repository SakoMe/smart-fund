import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import { Link } from '../routes';
import Layout from '../components/Layout';
import factory from '../ethereum/factory';

export default class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h2 style={{ marginTop: '3rem', marginBottom: '3rem' }}>
          All Campaigns
        </h2>
        <Link route="campaigns/new">
          <a>
            <Button
              floated="right"
              color="violet"
              icon="add circle"
              content="Create Campaign!"
            />
          </a>
        </Link>
        <div>{this.renderCampaigns()}</div>
      </Layout>
    );
  }
}
