![](https://raw.githubusercontent.com/joehoyle/vienna/35a39bb6366cb3f1fdc7a35b72357dd8bc0d56ae/images/screenshot.png)

# Vienna

Vienna is an open-source native iOS app for interacting with your WordPress
site.

Vienna is written in React Native and uses the [WP REST API](https://github.com/WP-API/WP-API)
to interact with your WordPress install.

## Requirements

### Local development setup
- Xcode 7 or higher.
- NPM 3.x.
- Node 4.x.

### WordPress site
- WordPress 4.7 or higher.
- [WP REST API OAuth 1 plugin](https://github.com/WP-API/OAuth1)
- [WP REST API Broker Auth Client](https://github.com/WP-API/broker-client)

## Development

### Project setup
- Clone the repository.
- In Terminal, change to the project folder, and run `npm install`.

### Building the app
- Open Xcode, and open the `ios/Vienna.xcodeproj` project.
- Select _Product > Run_.

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
- Run the app in the iOS simulator.
- Hit _CMD + D_ on the keyboard.
- Select _Debug in Chrome_ to open a Chrome window ready for debugging.

## Learning
- Free [video course](https://learnredux.com) for learning Redux.
