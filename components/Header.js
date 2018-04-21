import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

const Header = () => (
  <Menu inverted style={{ fontSize: '1.5rem', borderRadius: 0 }}>
    <Link route="/">
      <a className="item">Ethereum Armenia Fund</a>
    </Link>
    <Menu.Menu position="right">
      <Link route="/">
        <a style={{ fontSize: '1rem' }} className="item">
          View All Campaigns
        </a>
      </Link>
      <Link route="/campaigns/new">
        <a style={{ fontSize: '1rem' }} className="item">
          Create New Campaign
        </a>
      </Link>
    </Menu.Menu>
  </Menu>
);

export default Header;
