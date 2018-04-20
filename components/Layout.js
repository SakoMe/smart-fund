import React from 'react';
import Head from 'next/head';
import { Container } from 'semantic-ui-react';
import Header from './Header';

const Layout = props => (
  <React.Fragment>
    <Head>
      <title>Democratic Armenia Fund 🇦🇲</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
      />
    </Head>
    <Header />
    <Container>{props.children}</Container>
  </React.Fragment>
);

export default Layout;
