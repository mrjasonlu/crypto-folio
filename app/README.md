# Crypto Folio Android App

Author: Jason Lu

## Enviroment Requirements:

- Node => 16
- Yarn package manager

## Getting Started

> **Note**: Make sure you have completed the [React Native - Android Environment Setup](https://reactnative.dev/docs/environment-setup?guide=native&platform=android) instructions till "Creating a new application" step, before proceeding.

### Step 1: Start the Server

Navigate to `/server`

```bash
yarn install
yarn start
```

### Step 2: Start the Crypto Folio App

Navigate to `/app`

```bash
yarn install
yarn android
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ shortly - provided you have set up your emulator/simulator correctly.

## Troubleshooting

If you are seeing network request errors on your Android Emulator when making request to the server, you may need to update the server address at `/app/src/config/settings.ts` from `localhost` to `http://10.0.2.2:4000/graphql` or `http://<your ip address>:4000/graphql`
