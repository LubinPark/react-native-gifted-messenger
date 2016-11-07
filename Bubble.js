import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const charWrap = (width-90) / (320-90) * 14;

import ParsedText from 'react-native-parsed-text';

const styles = StyleSheet.create({
  bubble: {
    borderRadius: 8,
    paddingLeft:  14,
    paddingRight: 14,
    //paddingBottom:0,
    paddingTop:   4,
    borderWidth:StyleSheet.hairlineWidth,
    borderColor:'#ccc',
  },
  text: {
    color: '#1b1b1b',
    fontSize:15,
    lineHeight:24,
    alignSelf:'flex-start'
  },
  textLeft: {
  },
  textRight: {
    color: '#fff',
  },
  textCenter: {
    textAlign: 'center',
  },
  bubbleLeft: {
    marginRight: 70,
    backgroundColor: '#e6e6eb',
    alignSelf: 'flex-start',
  },
  bubbleRight: {
    marginLeft: 70,
    backgroundColor: '#007aff',
    alignSelf: 'flex-end',
  },
  bubbleCenter: {
    backgroundColor: '#007aff',
    alignSelf: 'center',
  },
  bubbleError: {
    backgroundColor: '#e01717',
  },
});

export default class Bubble extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width:width,
      rendered:false
    };
  }

  componentWillMount() {
    Object.assign(styles, this.props.styles);
  }

  renderText(text = '', position) {
    if (this.props.renderCustomText) {
      return this.props.renderCustomText(this.props);
    }

    if (this.props.parseText === true) {
      return (
        <ParsedText
          onLayout={this.textLayout.bind(this)} 
          style={[styles.text, (position === 'left' ? styles.textLeft : position === 'right' ? styles.textRight : styles.textCenter)]}
          parse={
            [
              {
                type: 'url',
                style: {
                  textDecorationLine: 'underline',
                },
                onPress: this.props.handleUrlPress,
              },
              {
                type: 'phone',
                style: {
                  textDecorationLine: 'underline',
                },
                onPress: this.props.handlePhonePress,
              },
              {
                type: 'email',
                style: {
                  textDecorationLine: 'underline',
                },
                onPress: this.props.handleEmailPress,
              },
            ]
          }
        >
          {text}
        </ParsedText>
      );
    }

    return (
      <Text 
        onLayout={this.textLayout.bind(this)} 
        style={[styles.text, (position === 'left' ? styles.textLeft : position === 'right' ? styles.textRight : styles.textCenter)]}>
        {text}
      </Text>
    );
  }

  textLayout(event){
    let {width,height} = event.nativeEvent.layout;
    if(height < 40) this.setState({width:width+30,rendered:true});
    else this.setState({rendered:true});
  }

  render() {
    const flexStyle = {};
    if (this.props.text) {
      if (this.props.text.length > charWrap){
        flexStyle.flex = 1;
        flexStyle.paddingBottom = 6;
      }
      if(!this.state.rendered)
        flexStyle.opacity = 0;
    }
    if(this.state.width < width){
      flexStyle.width = this.state.width;
      flexStyle.flex = 0;
    }

    return (
      <View style={[styles.bubble,
        (this.props.position === 'left' ? styles.bubbleLeft : this.props.position === 'right' ? styles.bubbleRight : styles.bubbleCenter), flexStyle]}>
        {this.props.name}
        {this.renderText(this.props.text, this.props.position)}
      </View>
  );
  }
}

Bubble.propTypes = {
  position: React.PropTypes.oneOf(['left', 'right', 'center']),
  status: React.PropTypes.string,
  text: React.PropTypes.string,
  renderCustomText: React.PropTypes.func,
  styles: React.PropTypes.object,
  parseText: React.PropTypes.bool,
  name: React.PropTypes.element,
  handleUrlPress: React.PropTypes.func,
  handlePhonePress: React.PropTypes.func,
  handleEmailPress: React.PropTypes.func,
};