import React from 'react';
import { Menu } from 'semantic-ui-react';

const Header = () => (
  <Menu>
    <Menu.Item>CrowdCoin</Menu.Item>
    <Menu.Menu position="right">
      <Menu.Item>Camapigns</Menu.Item>
      <Menu.Item>+</Menu.Item>
    </Menu.Menu>
  </Menu>
);

export default Header;
