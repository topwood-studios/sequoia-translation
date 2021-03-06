/* eslint-disable no-mixed-spaces-and-tabs */
import App from 'next/app';
import React from 'react';
import { withI18n } from '@tinalabs/react-tinacms-i18n';
import { TinaCMS, TinaProvider } from 'tinacms';
import {
  GithubClient,
  GithubMediaStore,
  TinacmsGithubProvider
} from 'react-tinacms-github';

import '../styles/globals.css';
import languages from '../lib/languages.json';

const githubClient = new GithubClient({
  proxy: '/api/proxy-github',
  authCallbackRoute: '/api/create-github-access-token',
  clientId: process.env.GITHUB_CLIENT_ID,
  baseRepoFullName: process.env.REPO_FULL_NAME,
  baseBranch: process.env.BASE_BRANCH
});

const store = new GithubMediaStore(githubClient);

export default class Site extends App {
  cms: TinaCMS;

  constructor(props) {
    super(props);
    this.cms = new TinaCMS({
      enabled: !!props.pageProps.preview,
      media: {
        store: store
      },
      apis: {
        github: githubClient
      },
      sidebar: props.pageProps.preview,
      toolbar: props.pageProps.preview
    });
  }

  render() {
    const { Component, pageProps } = this.props;

    const AppWrapper = withI18n(Component, {
      ApiOptions: {
        localeList: languages
      }
    });

    return (
      <TinaProvider cms={this.cms}>
        <TinacmsGithubProvider
          onLogin={onLogin}
          onLogout={onLogout}
          error={pageProps.error}
        >
          <AppWrapper {...pageProps} />
        </TinacmsGithubProvider>
      </TinaProvider>
    );
  }
}

const onLogin = async () => {
  const token = localStorage.getItem('tinacms-github-token') || null;
  const headers = new Headers();

  if (token) {
    headers.append('Authorization', 'Bearer ' + token);
  }

  const resp = await fetch('/api/preview', { headers: headers });
  const data = await resp.json();

  if (resp.status == 200) window.location.href = window.location.pathname;
  else throw new Error(data.message);
};

const onLogout = () => {
  return fetch('/api/reset-preview').then(() => {
    window.location.reload();
  });
};
