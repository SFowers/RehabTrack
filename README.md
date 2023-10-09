# RehabTrack

## T4-OL-Tool for disability rehabilitation

# Setting Up the RehabTrack React Native Project

Welcome to the RehabTrack React Native project setup guide. In this guide, we will walk you through the steps to set up your development environment for the RehabTrack project using Expo.

## Prerequisites

Before getting started, make sure you have the following prerequisites installed on your machine:

- Operating System: macOS, Windows, or Linux (Choose the one that's appropriate for your system)
- Node.js: Installed globally on your system
- npm or Yarn: Package manager
- Git: Version control system
- Code Editor: Visual Studio Code or your preferred code editor

## 1. Clone the Project Repository

First, you need to clone the RehabTrack project repository from GitHub to your local machine. Open your terminal or command prompt and run the following command:

```shell
git clone https://github.com/SFowers/RehabTrack.git
```

This will download the project's source code to your computer.

## 2. Node.js and npm (or Yarn)

Download and install Node.js from the official website: [Node.js Downloads](https://nodejs.org/).

Verify the installation by running the following commands in your terminal:

```shell
node -v
npm -v
```

or if using Yarn:

```shell
yarn -v
```

## 3. Install Expo CLI

Expo is a powerful toolchain and library for building React Native applications. To work with the RehabTrack project, you'll need Expo CLI. Install Expo CLI globally using npm or Yarn by running one of the following commands:

```shell
npm install -g expo-cli
```

or

```shell
yarn global add expo-cli
```

## 4. Install Dependencies

Open a terminal at the project's file directory, or navigate to the project directory in the terminal with:

```shell
cd RehabTrack
```

Install project dependencies using Yarn or npm:

```shell
yarn install
```

or

```shell
npm install
```

This will download and install all the required libraries and packages.

## 5. Start the Development Server

You are now ready to start the development server. Run the following command:

```shell
npx expo start
```

Expo will open a web interface in your default web browser. This interface allows you to run the app on different platforms, including Android, iOS, and web.

## 6. Testing on Mobile Devices

### Expo Go App (Recommended)

For easy testing on mobile devices, we recommend using the Expo Go app. You can install Expo Go from the app store on your Android or iOS device:

- [Expo Go on Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent&pcampaignid=web_share)
- [Expo Go on the App Store](https://apps.apple.com/us/app/expo-go/id982107779)

Once installed, use the Expo Go app to scan the QR code displayed in your computer's terminal (from `npx expo start`). This will load the RehabTrack app onto your mobile device.

### Emulators

If you prefer to use emulators for testing, you can set up Android emulators using Android Studio for Windows and Linux, or Xcode for macOS.

- Install [Android Studio](https://developer.android.com/studio)
- Install [Xcode](https://developer.apple.com/xcode/) (macOS only)

Follow the respective installation guides for Android Studio and Xcode. Once installed, launch your preferred emulator from the Android Studio AVD Manager (for Android) or Xcode (for iOS).

## 7. Code Editing

We recommend using Visual Studio Code or your preferred code editor for working on the project. Install relevant extensions for React Native development in your code editor to enhance your workflow.

## Conclusion

You have successfully set up the RehabTrack React Native project on your development environment. Now, you can start contributing to the project, making improvements, and testing it on your mobile device or emulator. Enjoy your development journey!

```

This markdown guide provides detailed instructions for setting up the RehabTrack React Native project using Expo, testing it on mobile devices, and selecting code editing tools. It also includes links to relevant resources for Android Studio and Xcode installations.
```
