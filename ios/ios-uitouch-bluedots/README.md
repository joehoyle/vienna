iOS UITouch Blue Dots
===

This repro provides simple code to add blue dots on the screen
for every UITouch. This makes it easy to record touch locations
for app demo videos.

Getting Started
===

To add blue dots to your project, just create a MMTouchDotView and add it to
the UIWindow when your application launches. That's it!

```
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // create the blue dot view
    MMTouchDotView* blueDots = [[MMTouchDotView alloc] initWithFrame:self.window.bounds];
    
    // optionally set the dot color, defaults to blue
    // blueDots.dotColor = [UIColor redColor];
    // optionally set the dot width, defaults to 20
    // blueDots.dotWidth = 40;
    
    // add the view to the window to make sure it's always visible
    [self.window addSubview:blueDots];
    
    // Override point for customization after application launch.
    return YES;
}
```
