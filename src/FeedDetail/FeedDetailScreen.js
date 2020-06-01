import React from 'react';
import {
  StatusBar,
  View,
  ActivityIndicator,
  Dimensions,
  Platform,
} from 'react-native';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';

import {
  ButtonNavigationComponent,
  EmptyStateComponent,
} from '../assets/components';

import {ServiceManager} from '../services';

import {EmptyStateIcon} from '../assets/icons';

import FeedDetailHeader from './FeedDetailHeader';
import FeedDetailCover from './FeedDetailCover';
import FeedDetailAbout from './FeedDetailAbout';
import FeedDetailGroupHeader from './FeedDetailGroupHeader';
import FeedDetailComics from './FeedDetailComics';

function FeedDetailScreen({navigation, route}) {
  const {CancelToken} = axios;
  const source = CancelToken.source();

  // MARK: -

  const [detailData, setDetailData] = React.useState(route.params?.data);
  const [comicsData, setComicsData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const [contentHeight, setContentHeight] = React.useState(0);
  const [contentContainerHeight, setContentContainerHeight] = React.useState(0);

  // MARK: -

  const scrollRef = React.useRef();

  // MARK: - Connection Life Cycle

  const getDetailData = React.useCallback(async () => {
    const uri = `characters/${route.params?.data.id}/comics?ts=1590319866736&apikey=b04f5397edc579388179f64a559e7609&hash=8492f06e66fba6707c8e8be2365a49e8&startYear=2005&limit=10&orderBy=-focDate`;

    ServiceManager()
      .get(uri)
      .then((response) => response.data)
      .then((data) => {
        setLoading(false);

        setComicsData(data.data.results);
      })
      .catch((thrown) => {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled', thrown.message);
        }
      });
  }, [route, setComicsData]);

  // MARK: - Screen Focus Hooks

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      StatusBar.setBarStyle('dark-content', true);

      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('white', true);
      }

      // MARK: -

      getDetailData();
    });

    return unsubscribe;
  }, [navigation, route, getDetailData]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setLoading(false);

      // Mark: -

      source.cancel('Operation canceled by the user.');
    });

    return unsubscribe;
  }, [navigation, source]);

  // MARK: -

  navigation.setOptions({
    headerLeft: () => (
      <ButtonNavigationComponent
        tintType="dark"
        name="arrow-left"
        onPress={navigation.goBack}
        ml={10}
      />
    ),

    headerRight: () => {
      return loading === true ? (
        <ButtonNavigationComponent type="dark" mr={10}>
          <ActivityIndicator color="black" />
        </ButtonNavigationComponent>
      ) : null;
    },
  });

  // MARK: - View Lifecycle

  const handleChangeScrollPosition = (position) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: 0,
        y: position,
        animated: true,
      });
    }
  };

  return (
    <ScrollView
      ref={scrollRef}
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
      onLayout={(e) => setContentContainerHeight(e.nativeEvent.layout.height)}
      contentContainerStyle={{
        minHeight: contentHeight + contentContainerHeight,
      }}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={1}
      stickyHeaderIndices={[1]}>
      <View onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}>
        <FeedDetailHeader item={detailData} />

        <FeedDetailCover item={detailData.thumbnail} />

        {detailData.description ? (
          <FeedDetailAbout item={{description: detailData.description}} />
        ) : (
          <View style={{height: 35}} />
        )}
      </View>

      <FeedDetailGroupHeader
        title="COMICS"
        onPress={() => handleChangeScrollPosition(contentHeight)}
      />

      {comicsData.map((item, index) => (
        <FeedDetailComics
          key={`FeedDetailComics_${index.toString()}`}
          item={item}
        />
      ))}

      {loading === false && comicsData.length === 0 ? (
        <EmptyStateComponent
          image={<EmptyStateIcon size={Dimensions.get('window').width / 2.5} />}
          title="No content found!"
          description={
            "No current content found.\nDon't forget to check out the other characters."
          }
        />
      ) : null}

      <View
        style={{
          height: 34,
        }}
      />
    </ScrollView>
  );
}

export default FeedDetailScreen;
