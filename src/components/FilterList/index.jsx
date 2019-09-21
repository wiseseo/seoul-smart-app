import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Filter from './Filter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function FilterList({ filter }) {
  const list = filter.map(text => <Filter key={text} text={text} />);
  return <ScrollView style={styles.container}>{list}</ScrollView>;
}

FilterList.propTypes = {
  filter: PropTypes.arrayOf(PropTypes.string).isRequired,
};
