import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import GiftedSpinner from 'react-native-gifted-spinner';

const styles = StyleSheet.create({
  errorButtonContainer: {
    //marginLeft: 8,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderWidth:StyleSheet.hairlineWidth,
    borderColor:'#ccc',
    borderRadius: 12,
    width: 24,
    height: 24,
    marginTop:7,
    marginRight:4,
  },
  errorButtonLoading:{
    alignSelf: 'flex-start',
    justifyContent: 'center',
    width: 24,
    height: 24,
    marginTop:7,
    marginRight:4,
  },
  errorButton: {
    fontSize: 22,
    color:'#666',
    textAlign: 'center',
  },
});

export default class ErrorButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };

    this.onPress = this.onPress.bind(this);
  }

  componentWillMount() {
    Object.assign(styles, this.props.styles);
  }

  onPress() {
    this.setState({
      isLoading: true,
    });

    this.props.onErrorButtonPress(this.props.rowData);
  }

  render() {
    if (this.state.isLoading === true) {
      return (
        <View style={styles.errorButtonLoading}>
          <GiftedSpinner />
        </View>
      );
    }
    return (
      <View style={styles.errorButtonLoading}>
        <TouchableHighlight
          hitSlop ={{top:20, left:20, bottom:20, right:20}}
          underlayColor="transparent"
          onPress={this.onPress}>
          <Text style={styles.errorButton}>↻</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

ErrorButton.propTypes = {
  styles: React.PropTypes.object,
  onErrorButtonPress: React.PropTypes.func,
  rowData: React.PropTypes.object,
};

ErrorButton.defaultProps = {
  onErrorButtonPress: () => {},
  rowData: {},
  styles: {},
};
