import React, { Component } from 'react';
import {
  View,
  Vibration,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  AsyncStorage,
  Platform
} from 'react-native';
import { connect } from 'react-redux';

class HeaderCustom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_role: null
    }
  }

  onBack = () => {
    this.props.navToMain(this.state.user_role);
  }

  componentWillMount() {
    AsyncStorage.getItem('USER_ROLE').then(data => {
      this.setState({
        user_role: data
      })
    })
  }

  render() {
    const { actionScan } = this.props;
    return (
      <View style={styles.header}>
        <TouchableHighlight underlayColor={'transparent'} style={styles.btnBack} onPress={this.onBack}>
          <View style={styles.btnBackView}>
            <Image
              source={require('../../../assets/images/back-icon.png')}
            />
            <Text style={[styles.headerText, { paddingLeft: 5 }]}>Scanner</Text>
          </View>
        </TouchableHighlight>
        <Text style={[styles.headerText, { fontSize: 17, fontWeight: 'bold' }]}>{actionScan === 'ticketEnter' ? 'ADMIT ENTRY' : 'VIEW INFO'}</Text>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  actionScan: state.userReducer.activeScan
});

const mapDispatchToProp = dispatch => ({
  navToMain: (role) => dispatch({ type: 'Reset', routeName: role })
});

export default connect(mapStateToProps, mapDispatchToProp)(HeaderCustom);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: (Platform.OS === 'ios') ? 20 : 0
  },
  headerText: {
    color: '#FFFFFF'
  },
  btnBack: {
    position: 'absolute',
    left: 0
  },
  btnBackView: {
    flexDirection: 'row',
    paddingLeft: 10
  }
});