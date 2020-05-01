# litten-ios

litten app iOS repository using React Native

## Development Commands

```sh
# Install dependencies
yarn install

# Install the cocoapods dependencies
cd ios/
pod install
cd -

# Run the simulator
yarn ios

# Run the ES linter
yarn lint

# Run the tests
yarn test

# Prepare the data dependencies
yarn prepare-data
```

## Backend

Currently, the project relies on a [Firebase][firebase] infrastructure. The app
will fail to build until a new project is [setup][setupfirebase] and the
`GoogleService-Info.plist` configutarion file is added to the `ios` directory.

## License

The project's source code is licensed as [AGPL-3.0][license], but the images are
[not licensed][licenseimgs].

<!-- References -->

[firebase]: https://firebase.google.com/
[setupfirebase]: https://firebase.google.com/docs/ios/setup
[license]: ./LICENSE
[licenseimgs]: ./lib/images/README.md
