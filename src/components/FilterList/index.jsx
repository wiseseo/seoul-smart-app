/* eslint-disable react/prop-types */
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Filter from './Filter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function FilterList({ filter, type, navigate }) {
  const list = filter.map(text => (
    <Filter key={text} type={type} text={text} navigate={navigate} />
  ));
  return <ScrollView style={styles.container}>{list}</ScrollView>;
}

FilterList.propTypes = {
  filter: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
};
