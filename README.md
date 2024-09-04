# Learning Tauri

Just one of the things I'm learning. <https://github.com/hchiam/learning>

Tauri is like Electron but lighter. You can still write code in HTML/CSS/JS and deploy to desktop (mobile upcoming). [Rust](https://github.com/hchiam/learning-rust) binary to basically run a Webview for your Front-End code (HTML/CSS/JS). But you can also make the Rust and JavaScript code talk to each other.

<https://www.youtube.com/watch?v=-X8evddpu7M>

<https://tauri.app/v1/guides/getting-started/prerequisites>

- install stuff like the latest [Rust](https://github.com/hchiam/learning-rust)

<https://tauri.app/v1/guides/getting-started/setup/html-css-js/>

```sh
yarn create tauri-app
```

or

```sh
mkdir ui
touch ui/index.html
# fill index.html and then
yarn add -D @tauri-apps/cli
yarn tauri init # and answer the prompts that follow
# ./ui
# ./ui or http://localhost:3000
# it'll create a folder named src-tauri
yarn tauri dev
```

<https://tauri.app/v1/guides/getting-started/setup/integrate/>

```sh
yarn add -D @tauri-apps/cli
yarn tauri init # and answer the prompts that follow
# it'll create a folder named src-tauri
yarn tauri dev
```
