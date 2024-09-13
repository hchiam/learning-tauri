# Learning Tauri

Just one of the things I'm learning. <https://github.com/hchiam/learning>

Tauri is like Electron but lighter. You can still write code in HTML/CSS/JS and deploy to desktop (mobile upcoming). [Rust](https://github.com/hchiam/learning-rust) binary to basically run a Webview for your Front-End code (HTML/CSS/JS). But you can also make the Rust and JavaScript code talk to each other.

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

- **output runnable file:** `/src-tauri/target/release/`[app name]
  - in my example, `/src-tauri/target/release/minimal-tauri-demo`, because `/src-tauri/tauri.conf.json` > package > productName = "minimal-tauri-demo"
- **installers will be at:** `/src-tauri/target/release/bundle/`(...)
- if you want to publish it to [itch.io](https://itch.io/), you should .zip the runnable file `/src-tauri/target/release/`[app name] (otherwise the app might not run after downloading it from itch.io)

(Aside note: although it might seem you can target for cross-platform with something like `yarn tauri build --target i686-pc-windows-msvc`, but apparently you can for now only build for the platform you're currently developing on - <https://github.com/tauri-apps/tauri/discussions/9884> - so you'll have to resort to things like the [official Tauri GitHub Action](https://tauri.app/v1/guides/building/cross-platform/))

## checking setup info

```sh
yarn tauri info
```

## tauri CLI documentation

<https://tauri.app/v1/api/cli/>
