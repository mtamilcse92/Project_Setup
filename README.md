# EZ Vidya Content portal

> UI app for EZ Vidya Content portal

## Development

* Run `npm install` and `npm start`
* Needs Node 7.x / npm v3.x or above

## Control flow

```
Render the App with Initial Global State
-> User interacts with Components
-> Components emit an Action/Message/Event
-> Goes to Store/Dispatcher/MessageBus/EventBus
-> Spreads to Reducers/Listeners/Processors/Handlers
-> Which handles the action and returns New Global State
-> Re-Render the App with New Global State
-> ... cycle continues ...
```

## Project Structure

* `dist`: Generated when you explicitly build or publish
* `src/reducers`: All actions and reducers. They can be shared across the same views or pages.
* `src/views`: All dumb views (i.e. they don't directly access the global state, they get it passed down as props)
* `src/pages`: All smart components and route pages (i.e. they select data from the global state and use dumb views to render the data). Each page reuses the actions and reducers that it *specifically* needs from the `actions` folder
* `src/app/`: Core app files
  * `common/`: Core functions, like validations and localisation.
  * `utils/`: Utilities required for app
  * `views`: Core views used across the application.
* `src/store/`: Store configuration
* `src/styles`: Styling used in app
* `src/utils`: Basic utilities used, like helper methods
* `src/index.js`: Entry point where the app begins, Where the Store, State and React UI are connected together
* `src/index.ejs`: HTML template, index.js will be injected inside
* `src/routes.js`: Specifies available routing in app

## Conventions

* For coding conventions, we use eslint
  * It provides tools to check and enforce the coding styles
  * It supports ES6, ES7 and many upcoming changes in Javascript
  * Run `npm lint` to validate
* File naming
  * `TitleCase.js` for React components
  * `camelCase.js` for other files
  * This seems to be prevalent across React projects in GitHub
  * `custom-component.css` for css files 
* Folder naming
  * `folder-name` for folders
* Actions
  * Each action will have `type`, `payload`, `meta` and `error`. See [Flux Standard Action](https://github.com/acdlite/flux-standard-action)
  * Example: If a Phone number is updated, `payload` will be updated details and `meta` will be array index of the phone.
  * Example: If a new Phone number was added, `payload` will be new phone details and `meta` is not needed.
  * This makes it easy to generate and handle actions. We know for sure that all actions will have payload, and some may have meta/error. That's it.

## TODO
  1. Configuration setup for dev and prod env.
  2. Setup deployment
