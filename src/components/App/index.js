import React, { Component } from 'react';
import AddChannel from './mutationChannel/AddChannel';
import ChannelsListWithData from './mutationChannel/ChannelsListWithData'
import classnames from 'classnames';
import './style.css';
import { ApolloClient, gql, graphql, ApolloProvider, createNetworkInterface } from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:4000/graphql',
});

const apolloClient = new ApolloClient({networkInterface});

class App extends Component {
  render() {
    const { className, ...props } = this.props;
    return (
      <ApolloProvider client={apolloClient}>
        <div className={classnames('App', className)} {...props}>
          <p className="App-intro">
              <ChannelsListWithData />
          </p>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
