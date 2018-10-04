import React, { Component } from 'react';
import { View, FlatList } from 'react-native';

import styles from './review-share-request-styles';
import ShareRequest from '../../components/ShareRequest/share-request';

export default class ReviewShareRequest extends Component {
  constructor() {
    super();

    this.keyExtractor = (item, index) => item.uid;
  }

  render() {
    return (
      <View style={styles.shareRequestContainer}>
        <FlatList data={this.props.navigation.state.params.listing.whoWantsToCome} keyExtractor={this.keyExtractor} renderItem={({ item, index }) => {
            return (
              <ShareRequest {...item} index={index} listing={this.props.navigation.state.params.listing} />
            )
          }}
        />
      </View>
    )
  }
}