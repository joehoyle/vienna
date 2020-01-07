![](https://raw.githubusercontent.com/joehoyle/vienna/35a39bb6366cb3f1fdc7a35b72357dd8bc0d56ae/images/screenshot.png)

# Vienna

Vienna is an open-source native iOS app for interacting with your WordPress site.

Vienna is written in React Native and uses the [WP REST API](https://github.com/WP-API/WP-API) to interact with your WordPress install.

## Requirements

Vienna is an [Expo](https://docs.expo.io/versions/latest/) React Native app. You can run the app directly without any iOS development environment.

### Local development setup

A standard npm and node environment is required. We recommend at least Node 8.14+.

### WordPress site

- WordPress 4.7 or higher.


## Development

### Project setup

Clone the repository, and run `yarn install`:

```
git clone https://github.com/joehoyle/vienna.git
cd vienna
yarn install
```

To run the app, run `npm start` and follow the on-screen directions.

If you have the iOS Simulator installed, you can press <kbd>i</kbd> to start the simulator; otherwise, install the [Expo app](https://itunes.com/apps/exponent) from the App Store, then use your phone's camera to scan the QR code.


### Connecting to your WordPress site

- Add a new site from the App
- Enter the URL of your WordPress site

### Working on the app

To open the Expo menu while using the app, shake your device, or press <kbd>Cmd-D</kbd> in the simulator.

Download and install the [React Native Debugger app](https://github.com/jhen0409/react-native-debugger). This will provide a full debugging environment including Redux Dev Tools.

To use the debugger:

1. Open the Expo menu in the app, and enable remote debugging
2. On your computer, open the React Native Debugger app
3. Select Window > New Window (or press <kbd>Cmd-T</kbd>) and connect to port 19001


## Testing

### Running end-to-end tests

To run end-to-end tests, you'll need [Detox and native dependencies](https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md#step-1-install-dependencies) it requires:

```
$ brew tap wix/brew
$ brew install applesimutils
$ yarn global add detox-cli
```

You'll also need a copy of the Expo app. Download the IPA from [Expo's site](https://expo.io/tools#client). Unzip the downloaded archive, then rename the unzipped directory to `Exponent.app`, and move to `vienna/bin/`.

Then, run `yarn start` to start Vienna. Once it's running, run `yarn run test:e2e` to run Detox's tests in the simulator.

To generate screenshots, run `yarn run generate-screenshots`.


## Learning
- Free [video course](https://learnredux.com) for learning Redux.
