/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Document, { Main, NextScript, Head } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage((App) => (props) => sheet.collectStyles((
      <>
        <App {...props} />
      </>
    )));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang="br">
        <Head>
          {this.props.styleTags}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-NH30V45MSC" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-NH30V45MSC');
              `,
            }}
          />
          <script src="//connect.facebook.net/en_US/sdk.js" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                FB.init({
                  appId: '${process.env.FACEBOOK_APP_ID}',
                  status: false,
                  cookie: false,
                  xfbml: false,
                  version: 'v5.0'
                });
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
