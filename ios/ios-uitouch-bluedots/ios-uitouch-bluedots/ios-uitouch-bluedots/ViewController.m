//
//  ViewController.m
//  ios-uitouch-bluedots
//
//  Created by Adam Wulf on 12/23/14.
//  Copyright (c) 2014 Milestone Made. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(IBAction) didTapButton:(id)sender{
    UIActivityViewController *activityViewController = [[UIActivityViewController alloc] initWithActivityItems:@[@"Just a sample UI to show the blue dots!"] applicationActivities:nil];
    [self presentViewController:activityViewController animated:YES completion:nil];
}

@end
