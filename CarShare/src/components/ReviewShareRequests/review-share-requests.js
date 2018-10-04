import React, { Component } from 'react';
import { View, FlatList } from 'react-native';

import styles from './review-share-requests-styles';
import ShareRequest from '../ShareRequest/share-request';

export default class ReviewShareRequests extends Component {
  constructor() {
    super();

    this.keyExtractor = (item, index) => item.uid;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.shareRequestContainer}>
          <FlatList data={this.props.navigation.state.params.listing.whoWantsToCome} keyExtractor={this.keyExtractor} renderItem={({ item, index }) => {
              return (
                <ShareRequest {...item} index={index} listing={this.props.navigation.state.params.listing} />
              )
            }}
          />
        </View>
      </View>
    )
  }
}