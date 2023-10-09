# RehabTrack

## T4-OL-Tool for disability rehabilitation

# Setting Up the React Native Development Environment

## Overview

This document provides step-by-step instructions on how to set up the development environment for a React Native project. It includes the installation of required tools, dependencies, and configurations to enable team members to work on the project effectively.

## Prerequisites

Before setting up the environment, ensure that your system meets the following prerequisites:

- **Operating System:** macOS, Windows, or Linux (choose the one appropriate for your team)
- **Node.js:** Installed globally on your system
- **npm or Yarn:** Package manager (preferably Yarn) installed globally
- **Android Studio:** For Android development
- **Xcode:** For iOS development (macOS only)
- **Git:** Version control system
- **Code Editor:** Visual Studio Code or any preferred code editor

## Environment Setup

### 1. Node.js and npm (or Yarn)

- Download and install Node.js from the official website: [Node.js Downloads](https://nodejs.org/).
- Verify the installation by running the following commands in your terminal:

  ```shell
  node -v
  npm -v
  ```

  or if using Yarn:

  ```shell
  yarn -v
  ```

### 2. React Native CLI

- Install the React Native CLI globally and npx globally using npm or Yarn:

  ```shell
  npm install -g react-native-cli
  npm install -g npx
  ```

  or

  ```shell
  yarn global add react-native-cli
  ```

### 3. Android Development

#### Easy:

- Install Expo Go on your android Device: [Expo Go on Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent&pcampaignid=web_share).
- In your computer's Terminal, run:

  ```shell
  npx expo start
  ```

- Using the Expo Go App, scan the QR code that appears in your computer's terminal; this will load the application onto your mobile device.

#### Hard:

- **Android Studio:** Download and install Android Studio from the official website: [Android Studio Downloads](https://developer.android.com/studio).
- Set up Android Virtual Devices (AVDs) for testing. Launch Android Studio, open the AVD Manager, and create virtual devices.
- Ensure that the Android SDK is installed and the ANDROID_HOME environment variable is set correctly. You can add the following to your shell profile (e.g., .bashrc or .zshrc):

  ```shell
  export ANDROID_HOME=/path/to/android-sdk
  export PATH=$PATH:$ANDROID_HOME/emulator
  export PATH=$PATH:$ANDROID_HOME/tools
  export PATH=$PATH:$ANDROID_HOME/tools/bin
  export PATH=$PATH:$ANDROID_HOME/platform-tools
  ```

- Install required Android SDK components using the Android SDK Manager.

### 4. iOS Development (macOS Only)

- **Xcode:** Download and install Xcode from the Mac App Store.
- Install Xcode Command Line Tools:

  ```shell
  xcode-select --install
  ```

### 5. Git

- Install Git from the official website: [Git Downloads](https://git-scm.com/downloads).
- Configure Git with your username and email:

  ```shell
  git config --global user.name "Your Name"
  git config --global user.email "youremail@example.com"
  ```

### 6. Code Editor

- Install a code editor (e.g., Visual Studio Code) and relevant extensions for React Native development.

## Project Setup

### 1. Clone the Project Repository

- Clone the project repository from your version control system (e.g., GitHub, Bitbucket):

  ```shell
  git clone https://github.com/SFowers/RehabTrack.git
  ```

### 2. Install Project Dependencies

- Navigate to the project directory:

  ```shell
  cd <project-directory>
  ```

- Install project dependencies using npm or Yarn:

  ```shell
  npm install
  ```

  or

  ```shell
  yarn install
  ```

### 3. Run the Project

- Start the development server:

  ```shell
  npx expo start
  ```

  Or

  ```shell
  npm start
  ```

  Or

  ```shell
  yarn start
  ```

**Additional Information:**

- For Android development, an easy option using Expo Go is provided, which allows you to quickly run your app on an Android device.
- For iOS development, Xcode is required, and it's only available on macOS.
- React Native CLI and Expo are both popular development environments for React Native. The choice between them depends on your project requirements.
- Be sure to follow the specific installation and setup instructions for your preferred tools and platforms, as additional configuration may be required for your project's needs.
