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
```

<https://tauri.app/v1/guides/getting-started/setup/integrate/>

```sh
yarn add -DE @tauri-apps/cli
yarn tauri init # and answer the prompts that follow
# it'll create a folder named src-tauri
yarn tauri dev
```
