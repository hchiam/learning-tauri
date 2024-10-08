# Learning [Tauri](https://github.com/tauri-apps/tauri)

Just one of the things I'm learning. <https://github.com/hchiam/learning>

Tauri is like Electron but lighter. You can still write code in HTML/CSS/JS and deploy to desktop ([mobile coming in the future](https://www.youtube.com/watch?v=cVYlih-jFwI)). [Rust](https://github.com/hchiam/learning-rust) binary to basically run a Webview for your Front-End code (HTML/CSS/JS). But you can also make the Rust and JavaScript code talk to each other.

<https://www.youtube.com/watch?v=-X8evddpu7M>

<https://tauri.app/v1/guides/getting-started/prerequisites>

- install stuff like the latest [Rust](https://github.com/hchiam/learning-rust)

<https://tauri.app/v1/guides/getting-started/setup/html-css-js/>

```sh
yarn create tauri-app
yarn
yarn dev
# http://localhost:1420/
```

or

```sh
mkdir ui
touch ui/index.html
# fill index.html and then
yarn add -DE @tauri-apps/cli
yarn tauri init # and answer the prompts that follow and it'll create a folder /src-tauri
# Where are your web assets (HTML/CSS/JS) located, relative to the "<current dir>/src-tauri/tauri.conf.json" file that will be created?
#   ../ui
# What is the url of your dev server?
#   ../ui
# What is your frontend dev command
#   (delete the default to leave blank if not compiling anything)
# What is your frontend build command?
#   (delete the defaultto leave blank if not compiling anything)
yarn tauri dev
# if you get an error like "Error failed to get cargo metadata: No such file or directory (os error 2)" you might need to (re-)install rust, which includes cargo:
brew install rust
yarn tauri dev
```

<https://tauri.app/v1/guides/getting-started/setup/integrate/>

```sh
yarn add -DE @tauri-apps/cli
yarn tauri init # and answer the prompts that follow
# it'll create a folder named src-tauri
yarn tauri dev
```

## Then to publish (i.e. export runnable/installers)

<https://tauri.app/v1/guides/distribution/publishing>

Edit `/src-tauri/tauri.conf.json` > tauri > bundle > identifier, then run this:

```sh
yarn tauri build
```

- according to the official docs when i last checked:
  - **output runnable file:** `/src-tauri/target/release/`[app name]
    - in my example, `/src-tauri/target/release/minimal-tauri-demo`, because `/src-tauri/tauri.conf.json` > package > productName = "minimal-tauri-demo"
    - but i found that this file also opens some terminal in the background
  - **installers will be at:** `/src-tauri/target/release/bundle/`(...)
- but from what i found:
  - **output runnable file (.app example for mac):** `/src-tauri/target/release/bundle/macos`[app name.app]
    - <img alt="where the .app file is for mac" src="where_the_.app_file_is_for_mac.png" height="300">
  - **ALSO NOTE:** if you want to publish the `.app` file to [itch.io](https://itch.io/), you should .zip the runnable file `/src-tauri/target/release/`[app name.app] (otherwise the app might not run after downloading it from itch.io)

- Aside note: although it might seem you can target for cross-platform compilation with something like `yarn tauri build --target i686-pc-windows-msvc`, but apparently you can for now only build for the platform you're currently developing on - <https://github.com/tauri-apps/tauri/discussions/9884> - so you'll have to resort to things like the [official Tauri GitHub Action](https://tauri.app/v1/guides/building/cross-platform/)

## [mobile coming in the future](https://www.youtube.com/watch?v=cVYlih-jFwI)

- `yarn tauri ios init`
- `yarn tauri ios dev` (emulator)
- `yarn tauri android init`
- `yarn tauri android dev` (emulator)

## checking setup info

```sh
yarn tauri info
```

## tauri CLI documentation

<https://tauri.app/v1/api/cli/>
