import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Header';

const Layout = props => (
  <React.Fragment>
    <Header />
    <Container>{props.children}</Container>
  </React.Fragment>
);

export default Layout;
