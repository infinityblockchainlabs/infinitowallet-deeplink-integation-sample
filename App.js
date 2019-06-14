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
const appLinkScheme = "deepLink://"
const appLinkExtraParam = "id=123"
const urlLink = "http://google.com.vn"

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: "getAddresses",
      coin: "btc",
      useWalletName: "true",
      params: "",
      // callback: `${appLinkScheme}`,
      callback: `${urlLink}`,
      tabIndex: 0
    };
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
        ? `${infinitoWalletScheme}/${this.state.action}?coin=${this.state.coin}&useWalletName=${this.state.useWalletName}&callback=${this.state.callback}`
        : (isGetPublicKeyAction
            ? `${infinitoWalletScheme}/${this.state.action}?coin=${this.state.coin}&useWalletName=${this.state.useWalletName}&callback=${this.state.callback}`
            : `${infinitoWalletScheme}/${this.state.action}?coin=${this.state.coin}&params=${this.state.params}&callback=${this.state.callback}`);
  };

  onChange = (key, val) => {
    this.setState({ [key]: val });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
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
          Get wallet address
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
          this.onChange("params", JSON.stringify({ from: 'ABC', to: 'XYZ', value: 0.00001 }));
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
          this.onChange("params", JSON.stringify({ rawTx: "01000000011e133bf22e9275344a7b1c0f6a891934c35a764a87513b8462f456e5f9d69090010000006a473044022032da611a90c7edf7735046c31c6dfc212f3d855eb7da8ce0f2daa62156d5eabb0220047c499dd46b8c7f6ad5d57bb4d3712a503e82be58b93f301ed597e8f434b56b0121025a1109e02a4dae3ec2a5dc03e52b76ea4030e0d2cbf849c61df113a5b48ac53fffffffff01e8030000000000001976a914f6a2fa24781786829cb122035dcf3fc8faee5e2d88ac00000000" }));
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
          this.onChange("params", JSON.stringify({ data: "Sign BTC message", password: "2tpmI8fa" }));
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
    backgroundColor: "#F5FCFF",
    padding: 10
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