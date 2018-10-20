## Working with linked webmiddle

Assuming you have cloned this repo as a submodule with https://github.com/webmiddle/webmiddle-all

Before installing dependencies with `yarn`, run the following to link the local webmiddle packages.

```sh
chmod +x link.sh
./link.sh
```

## Commands

Install dependencies

```sh
yarn
```

Build

```sh
yarn build
```

Test

```sh
yarn test
```

For development, automatically rebuild and restart server on changes:

```sh
yarn start
```


## Adding Browser

The `Browser` component isn't included by default as it greatly increases the install time,
since it requires a compatible verison of Chromium that is downloaded during installation.

If you need it, type the following

```bash
yarn add webmiddle-component-browser
```
