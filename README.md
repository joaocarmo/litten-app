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

Currently, the project relies on a [Firebase][firebase] infrastructure.

## License

The project's source code is licensed as [AGPL-3.0][1], but the images are
[not licensed][2].

<!-- References -->

[firebase]: https://firebase.google.com/
[license]: ./LICENSE
[licenseimgs]: ./lib/images/README.md
