import React, { Component } from "react";
import {
  Linking,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";

const infinitoWalletScheme = "infinitowallet://assets"
const appLinkScheme = "deep-link://"
const appLinkExtraParam = "id=123"

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: "getAddresses",
      coin: "btc",
      useWalletName: "true",
      params: "",
      callback: `${appLinkScheme}`,
      tabIndex: 0
    };

    Linking.getInitialURL().
    then((url) => {
      console.log("deepLinkCallBack url = ", url)
    }).catch(err => console.error('getInitialURL error = ', err));
  }

  componentDidMount () {
    Linking.addEventListener("url", this.handleCallBackFromDeepLink);
  }

  componentWillUnmount () {
    Linking.removeEventListener('url', this.handleCallBackFromDeepLink)
  }

  handleCallBackFromDeepLink = async (event: Object) => {
    console.log("deepLinkCallBack event= ", event)
  }

  openAppLink = () => {
    let appLink = this.getLink();
    Linking.openURL(appLink).catch(err =>
      alert("An error occurred: " + err)
    );
  };

  getLink = () => {
    var isGetAddressAction = (this.state.action === "getAddress" || this.state.action === "getAddresses")
    var isGetPublicKeyAction = (this.state.action === "getPublicKey")

    return isGetAddressAction
        ? `${infinitoWalletScheme}/${this.state.action}?coin=${this.state.coin}&useWalletName=${this.state.useWalletName}&callback=${this.state.callback}${this.state.action}?${appLinkExtraParam}`
        : (isGetPublicKeyAction
            ? `${infinitoWalletScheme}/${this.state.action}?coin=${this.state.coin}&useWalletName=${this.state.useWalletName}&callback=${this.state.callback}${this.state.action}?${appLinkExtraParam}`
            : `${infinitoWalletScheme}/${this.state.action}?coin=${this.state.coin}&params=${this.state.params}&callback=${this.state.callback}${this.state.action}?${appLinkExtraParam}`);
  };

  onChange = (key, val) => {
    this.setState({ [key]: val });
  };

  render() {
    return (
      <View style={{ flex: 1, margin: 20 }}>
      <ScrollView>
      <Text style={styles.title}>Infinito Wallet App Link</Text>

      <View style={styles.wrapTab}>
      <TouchableOpacity
        style={[
          styles.tab,
          this.state.tabIndex == 0 && {
            backgroundColor: "#4388FF"
          }
        ]}
        onPress={() => {
          this.onChange("tabIndex", 0);
          this.onChange("action", "getAddresses");
          this.onChange("params", "");
        }}
      >
        <Text
          style={
            this.state.tabIndex == 0
            ? { color: "white", textAlign: "center" }
            : { color: "black", textAlign: "center" }
          }
        >
          Get wallet addresses
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tab,
          this.state.tabIndex == 1 && {
            backgroundColor: "#4388FF"
          }
        ]}
        onPress={() => {
          this.onChange("tabIndex", 1);
          this.onChange("action", "sent");
          this.onChange("params", JSON.stringify({ from: 'ABC', to: 'XYZ', password: "Password of Passphrase", value: "0.00001" }));
        }}
      >
        <Text
          style={
            this.state.tabIndex == 1
            ? { color: "white", textAlign: "center" }
            : { color: "black", textAlign: "center" }
          }
        >
          Sent Coin
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tab,
          this.state.tabIndex == 2 && {
            backgroundColor: "#4388FF"
          }
        ]}
        onPress={() => {
          this.onChange("tabIndex", 2);
          this.onChange("action", "sentRaw");
          this.onChange("params", JSON.stringify({ rawTx: "rawTx" }));
        }}
      >
        <Text
          style={
            this.state.tabIndex == 2
            ? { color: "white", textAlign: "center" }
            : { color: "black", textAlign: "center" }
          }
        >
          Sent Raw
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tab,
          this.state.tabIndex == 3 && {
            backgroundColor: "#4388FF"
          }
        ]}
        onPress={() => {
          this.onChange("tabIndex", 3);
          this.onChange("action", "sign");
          this.onChange("params", JSON.stringify({ data: "Sign BTC message", password: "Password of Passphrase" }));
        }}
      >
        <Text
          style={
            this.state.tabIndex == 3
            ? { color: "white", textAlign: "center" }
            : { color: "black", textAlign: "center" }
          }
        >
          Sign Data
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tab,
          this.state.tabIndex == 4 && {
            backgroundColor: "#4388FF"
          }
        ]}
        onPress={() => {
          this.onChange("tabIndex", 4);
          this.onChange("action", "getPublicKey");
          this.onChange("params", "");
        }}
      >
        <Text
          style={
            this.state.tabIndex == 4
              ? { color: "white", textAlign: "center" }
              : { color: "black", textAlign: "center" }
          }
        >
          Get public key
        </Text>
      </TouchableOpacity>
    </View>

      <Text
          style={styles.input}
          underlineColorAndroid="transparent"
      >
        {this.state.action}
      </Text>

      <Text
          style={styles.input}
          underlineColorAndroid="transparent"
      >
        {this.state.coin}
      </Text>

      <Text
          style={styles.input}
          underlineColorAndroid="transparent"
      >
        {this.state.useWalletName}
      </Text>

      <Text
          style={styles.input}
          underlineColorAndroid="transparent"
      >
        {this.state.params}
      </Text>

      <Text
          style={styles.input}
          underlineColorAndroid="transparent"
      >
        {this.state.callback}
      </Text>

        <Text style={{ marginTop: 40, color: "red" }}>
          App link: "{this.getLink()}"
        </Text>

        <TouchableOpacity
          onPress={this.openAppLink}
          style={styles.button}
        >
          <Text style={styles.btnText}>Open App Link</Text>
        </TouchableOpacity>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  input: {
    width: Dimensions.get("window").width - 20,
    height: 40,
    marginTop: 20,
    borderBottomWidth: 1,
    textAlignVertical: "center",
    borderColor: "grey",
    color: "black"
  },
  button: {
    backgroundColor: "#4388FF",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 40
  },
  btnText: {
    color: "white"
  },
  wrapTab: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#4388FF",
    marginTop: 40
  },
  tab: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    color: "#4388FF",
    fontWeight: "bold",
    fontSize: 25
  }
});