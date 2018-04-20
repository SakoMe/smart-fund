import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';

export default class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }
  render() {
    return (
      <Layout>
        <h2 style={{ marginTop: '3rem', marginBottom: '3rem' }}>
          Requests List
        </h2>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary>Add Request</Button>
          </a>
        </Link>
      </Layout>
    );
  }
}
