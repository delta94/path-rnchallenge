import React from 'react';
import {
  RefreshControl,
  StatusBar,
  View,
  ActivityIndicator,
  Platform,
} from 'react-native';
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

import {ServiceManager} from '../services';
import {ButtonNavigationComponent} from '../assets/components';

import FeedRow from './FeedRow';

function FeedScreen({route, navigation}) {
  const {CancelToken} = axios;
  const source = CancelToken.source();

  // MARK: -

  const [feedData, setFeedData] = React.useState(null);

  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  // MARK: -

  navigation.setOptions({
    headerLeft: () => {
      return (
        <ButtonNavigationComponent
          type="dark"
          onPress={navigation.openDrawer}
          ml={10}>
          <Icon name="menu" size={22} />
        </ButtonNavigationComponent>
      );
    },
  });

  // MARK: - Screen Focus Hooks

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      StatusBar.setBarStyle('dark-content', false);

      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('white', true);
      }

      // MARK: -

      if (page === 0) {
        getFeedData();
      }
    });

    return unsubscribe;
  }, [getFeedData, navigation, page, route]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setLoading(false);

      // Mark: -

      source.cancel('Operation canceled by the user.');
    });

    return unsubscribe;
  }, [navigation, source]);

  // MARK: - Connection Life Cycle

  const getFeedData = React.useCallback(async () => {
    const limit = 10;
    const uri = `characters?ts=1590319866736&apikey=b04f5397edc579388179f64a559e7609&hash=8492f06e66fba6707c8e8be2365a49e8&limit=${limit}&offset=${
      page * limit
    }`;

    ServiceManager()
      .get(uri, {
        cancelToken: source.token,
      })
      .then((response) => response.data)
      .then((data) => {
        if (refreshing === true) {
          setFeedData(null);
        }

        setLoading(false);
        setRefreshing(false);

        const {results} = data.data;

        if (page === 0) {
          setFeedData(results);
        } else if (results.length > 0) {
          setFeedData([...(feedData || []), ...results]);
        }
      })
      .catch((thrown) => {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled', thrown.message);
        }
      });
  }, [source, feedData, page, refreshing]);

  // MARK: - View Lifecycle

  const onRefresh = () => {
    setPage(0);
    setRefreshing(true);
    getFeedData();
  };

  const getLoadMore = () => {
    if (loading === false) {
      setLoading(true);
      setPage(page + 1);

      getFeedData();
    }
  };

  function renderHeader() {
    return <View style={{height: 20}} />;
  }

  function renderFooter() {
    if (feedData?.length < 10) {
      return null;
    }

    return loading === true ? (
      <View
        style={{
          height: 80,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator
          color="black"
          hidesWhenStopped={true}
          animating={true}
        />
      </View>
    ) : (
      <View style={{height: 10}} />
    );
  }

  function renderItem({index, item}) {
    return (
      <FeedRow
        item={item}
        onPress={() => {
          navigation.navigate('FeedDetailScreen', {
            data: item,
          });
        }}
      />
    );
  }

  return (
    <FlatList
      data={feedData}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      numColumns={2}
      keyExtractor={(item, index) => `FeedScreen_${index.toString()}`}
      style={{
        height: '100%',
        backgroundColor: '#F7F7F7',
      }}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      scrollIndicatorInsets={{
        top: -0.5,
        bottom: -0.5,
        left: 0,
        right: 0,
      }}
      onEndReached={getLoadMore}
      onEndReachedThreshold={16}
    />
  );
}

export default FeedScreen;
