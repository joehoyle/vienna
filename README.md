![](https://raw.githubusercontent.com/joehoyle/vienna/35a39bb6366cb3f1fdc7a35b72357dd8bc0d56ae/images/screenshot.png)

# Vienna

Vienna is an open-source native iOS app for interacting with your WordPress
site.

Vienna is written in React Native and uses the [WP REST API](https://github.com/WP-API/WP-API)
to interact with your WordPress install.

## Requirements

Vienna is an [Expo](https://docs.expo.io/versions/latest/) React Native app. You can run the app directly without any iOS development environment.

### Local development setup

A standard npm and node environment is required. We recommend at least Node 8.14+.

### WordPress site

- WordPress 4.7 or higher.
- [WP REST API OAuth 1 plugin](https://github.com/WP-API/OAuth1)
- [WP REST API Broker Auth Client](https://github.com/WP-API/broker-client)


## Development

### Project setup

Clone the repository, and run `npm install`:

```
git clone https://github.com/joehoyle/vienna.git
cd vienna
npm install
```

To run the app, run `npm start` and follow the on-screen directions.

If you have the iOS Simulator installed, you can press <kbd>i</kbd> to start the simulator; otherwise, install the [Expo app](https://itunes.com/apps/exponent) from the App Store, then use your phone's camera to scan the QR code.


### Connecting to your WordPress site

#### Using a site with the Authentication Broker

- Add a new site from the App
- Enter the URL of your WordPress site

#### Using  site without the Authentication Broker

In this case, you'll just need the [WP REST API OAuth 1 plugin](https://github.com/WP-API/OAuth1) on your site.

- Add a new JSON Consumer in the WordPress Dashboard of your site by browsing to Users > Applications and clicking Add New
- Enter `wordpress-react-native://site_callback` as the callback URL
- Add a new site from the App
- Enter the URL of your WordPress site
- Press "OAuth 1.0"
- Enter the Client Key and Client Secret for the JSON Consumer application


### Working on the app

To open the Expo menu while using the app, shake your device, or press <kbd>Cmd-D</kbd> in the simulator.

Download and install the [React Native Debugger app](https://github.com/jhen0409/react-native-debugger). This will provide a full debugging environment including Redux Dev Tools.

To use the debugger:

1. Open the Expo menu in the app, and enable remote debugging
2. On your computer, open the React Native Debugger app
3. Select Window > New Window (or press <kbd>Cmd-T</kbd>) and connect to port 19001


## Learning
- Free [video course](https://learnredux.com) for learning Redux.
