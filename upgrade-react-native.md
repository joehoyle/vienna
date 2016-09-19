### Upgrading React Native Instructions

Upgrading react-native is not currently very simple, as it required clobbering all modifications to the Xcode project.
As such, the following things need to be done after running `react-native upgrade` (and choosing to overwrite files).

### react-native-fetch-blob

1. Add the `./node_modules/react-native-fetch-blob/ios/RNFetchBlob.xcodeproj` to the Libraries in Xcode.
1. Add the linked library `libRNFetchBlob.a` to "Linked Libraries and Frameworks" in the General tab.

### react-native-vector-icons

1. Add the `./node_modules/react-native-vector-icons/Fonts/FontAwesome.ttf` to the Xcode project sidebar. Make sure your app is checked under "Add to targets" and that "Create groups" is checked if you add the whole folder.
1. Edit Info.plist and add a property called Fonts provided by application (or UIAppFonts if Xcode won't autocomplete/not using Xcode) and type in the files you just added.

### react-native-safari-view

1. Add the `./node_modules/react-native-safari-view/SafariViewManager.xcodeproj` to the Libraries in Xcode.
1. Add the linked library `libSafariViewManager.a` to "Linked Libraries and Frameworks" in the General tab.

### Add RTCLinking

In the Header Search Paths in the Buld Target, add `$(SRCROOT)/../node_modules/react-native/Libraries/LinkingIOS`.

### Set up the App Icon

Because nuking the Xcode Project will remove all the details about the app icon, it has be to set up again.

### Add the URL handler

In the Info tab of the Build Target, add a URL Handler for `wordpress-react-native` with the identifier `org.joehoyle.vienna`.
