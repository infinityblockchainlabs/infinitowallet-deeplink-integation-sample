import React, { Component } from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";

var parse = require('url-parse')

const infinitoWalletScheme = "infinitowallet://assets"
const appLinkScheme = "deep-link://"

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // action: "getAddresses",
      action: "getAddress",
      coin: "btc",
      useWalletName: "",
      params: "",
      callback: "",
      response: "",
      tabIndex: 0
    };

    Linking.addEventListener("url", this.handleCallBackFromDeepLink);
    Linking.getInitialURL().
    then((url) => {
      if (url) {
        this.handleCallBackFromDeepLink({url})
      }
    }).catch(err => console.error('appLink error = ', err));
  }

  handleCallBackFromDeepLink = async (callback: Object) => {
    console.log("appLink callback = ", callback)

    try {
      let deepLinkUrl = callback.url
      console.log("appLink deepLinkUrl = ", deepLinkUrl)

      this.onChange("response", deepLinkUrl)
    } catch (error) {
      console.log("appLink error = ", error)
    }
  }

  onGetRequest = () => {
    let request = this.getRequest();
    Linking.openURL(request).catch(err =>
      alert("onGetRequest error: ", err)
    );
  };

  getRequest = () => {
    var isGetWalletName = (this.state.action === "getAddress" || this.state.action === "getAddresses" || this.state.action === "getPublicKey")

    return isGetWalletName
        ? `${infinitoWalletScheme}/${this.state.action}?coin=${this.state.coin}&useWalletName=${this.state.useWalletName}&callback=${appLinkScheme}${this.state.callback}`
        : `${infinitoWalletScheme}/${this.state.action}?coin=${this.state.coin}&params=${this.state.params}&callback=${appLinkScheme}${this.state.callback}`
  };

  onChange = (key, val) => {
    this.setState({ [key]: val });
  };

  render() {
    var isGetWalletName: boolean = this.state.tabIndex === 0 || this.state.tabIndex === 4 ? true : false

    return (
    <View style={{ flex: 1, marginTop: 60, marginStart: 10, marginEnd: 10, marginBottom: 60 }}>
      <ScrollView>
        <Text style={styles.title}>Infinito Wallet Deep Link</Text>

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
            // this.onChange("action", "getAddresses");
            this.onChange("action", "getAddress");
            this.onChange("useWalletName", "");
            this.onChange("params", "");
            this.onChange("callback", "");
            this.onChange("response", "");

          }}
        >
          <Text
            style={
              this.state.tabIndex == 0
              ? { color: "white", textAlign: "center", fontWeight: "bold" }
              : { color: "black", textAlign: "center" }
            }
          >
            Get wallet addresses
          </Text>
        </TouchableOpacity>

        <View style={{ backgroundColor: "#4388FF", width: 1, }} />

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
            this.onChange("useWalletName", "");
            this.onChange("params", JSON.stringify({ from: 'Address ABC', to: 'Address DEF', value: "0.00001" }));
            this.onChange("callback", "");
            this.onChange("response", "");
          }}
        >
          <Text
            style={
              this.state.tabIndex == 1
              ? { color: "white", textAlign: "center", fontWeight: "bold" }
              : { color: "black", textAlign: "center" }
            }
          >
            Sent Coin
          </Text>
        </TouchableOpacity>

        <View style={{ backgroundColor: "#4388FF", width: 1, }} />

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
            this.onChange("useWalletName", "");
            this.onChange("params", JSON.stringify({ rawTx: "rawTx" }));
            this.onChange("callback", "");
            this.onChange("response", "");
          }}
        >
          <Text
            style={
              this.state.tabIndex == 2
              ? { color: "white", textAlign: "center", fontWeight: "bold" }
              : { color: "black", textAlign: "center" }
            }
          >
            Sent Raw
          </Text>
        </TouchableOpacity>

        <View style={{ backgroundColor: "#4388FF", width: 1, }} />

        <TouchableOpacity
          style={[
            styles.tab,
            this.state.tabIndex == 3 && {
              backgroundColor: "#4388FF"
            }
          ]}
          onPress={() => {
            this.onChange("tabIndex", 3);
            this.onChange("action", "");
            this.onChange("useWalletName", "");
            this.onChange("params", JSON.stringify({ data: "Sign BTC message" }));
            this.onChange("callback", "");
            this.onChange("response", "");
          }}
        >
          <Text
            style={
              this.state.tabIndex == 3
              ? { color: "white", textAlign: "center", fontWeight: "bold" }
              : { color: "black", textAlign: "center" }
            }
          >
            Sign Data
          </Text>
        </TouchableOpacity>

        <View style={{ backgroundColor: "#4388FF", width: 1, }} />

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
            this.onChange("useWalletName", "");
            this.onChange("params", "");
            this.onChange("callback", "");
            this.onChange("response", "");
          }}
        >
          <Text
            style={
              this.state.tabIndex == 4
                ? { color: "white", textAlign: "center", fontWeight: "bold" }
                : { color: "black", textAlign: "center" }
            }
          >
            Get public key
          </Text>
        </TouchableOpacity>
        </View>

        <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            editable = {false}
            value={this.state.action}
        />

        <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            editable = {false}
            value={this.state.coin}
        />

        <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder={isGetWalletName ? "useWalletName: true or false" : ""}
            value={this.state.useWalletName}
            editable={isGetWalletName}
            onChangeText={(text) => this.onChange("useWalletName", text)}
        />

        <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            editable = {false}
            multiline = {true}
            value={this.state.params}
        />

        <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="callback param: getAddress?appId=ABC&id=123"
            multiline = {true}
            value={this.state.callback}
            onChangeText={(text) => this.onChange("callback", text)}
        />

        <Text style={{ marginTop: 30, color: "black", fontWeight: "bold" }}>
          Request: "{this.getRequest()}"
        </Text>

        <Text style={{ marginTop: 20, color: "black", fontWeight: "bold" }}>
          Response: "{this.state.response}"
        </Text>

        <TouchableOpacity
          onPress={this.onGetRequest}
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
    height: 60,
    borderBottomWidth: 1,
    textAlignVertical: "center",
    borderBottomColor: "black",
    color: "black",
    fontWeight: "bold"
  },
  button: {
    backgroundColor: "#4388FF",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    marginTop: 40
  },
  btnText: {
    color: "white",
    fontWeight: "bold"
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
    fontSize: 25,
    alignSelf: "center"
  }
});