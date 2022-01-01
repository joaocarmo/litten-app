<p align="center">
  <img src="https://raw.githubusercontent.com/joaocarmo/litten-app/master/lib/images/logo/blue.png" width="264" alt="litten">
</p>

# Litten

Litten mobile app repository using React Native and Firebase.

## Development Commands

```sh
# Install dependencies
yarn install

# Install the cocoapods dependencies
yarn pods

# Run the Android simulator
yarn android

# Run the iOS simulator
yarn ios

# Run the ES linter
yarn lint

# Run Prettier
yarn pretty

# Run the type checker (TypeScript)
yarn type-check

# Run the tests
yarn test

# Prepare the data dependencies
yarn prepare-data

# This will seed the Firestore DB with some data
yarn firestore:seed

# This will start the Firebase Emulator
yarn start:firebase
```

## Generic account

After seeding the Firestore DB, a generic account can be used right away.

```txt
   email: team@litten.app
password: thisisthepassword
```

## Environment

Customize the environment variables, some functions might fail due to lack of
certain API keys.

```sh
cp .env.example .env

cp android/secure.properties.example android/secure.properties
```

The `GOOGLE_API_KEY` needs to be available for the location functions.

Detailed instructions on how to setup the environment are available
[here][env-setup].

## Backend

Currently, the project relies on a [Firebase][firebase] infrastructure. The app
will fail to build until a new project is [setup][setupfirebase] and the
`GoogleService-Info.plist` configutarion file is added to the `ios` directory,
as well as the `google-services.json` file to `android/app`.

Additionally, you should install, configure and integrate the
[Local Emulator Suite][emulator].

### Current API dependecies

- [Google Maps (Geocoding)][googleapikey]
- [Jira][jira] (Report Problems)
- [Slack][slack] (Report Problems)

## License

The project's source code is licensed as [AGPL-3.0][license], but the images and
the design are [not licensed][licenseimgs].

<!-- References -->

[emulator]: https://firebase.google.com/docs/emulator-suite/install_and_configure
[env-setup]: https://reactnative.dev/docs/environment-setup
[firebase]: https://firebase.google.com
[googleapikey]: https://developers.google.com/maps/documentation/geocoding/get-api-key
[jira]: https://www.atlassian.com/software/jira
[license]: ./LICENSE
[licenseimgs]: ./lib/images/README.md
[setupfirebase]: https://firebase.google.com/docs/ios/setup
[slack]: https://slack.com
