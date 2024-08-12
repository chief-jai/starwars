<h1 align="center">Starwars</h1>

<div align="center">
This repository is a gallery for the characters, films, planets, starships from Starwars movies. The data is sourced from https://swapi.dev/api. This is built using React + Vite and the UI components are built using MUI Joy. This uses Jest + React Testing Library for unit testing and Playwright for E2E tests.
</div>

# Quick Start

## Live Demo

https://starwars-jaisurya.netlify.app/

## Prerequisites

### Node Version

Use Node `v20.x` and npm `10.x`

### npmrc

There is a .npmrc file in the project pointing to npm public registry. If you want to connect to a private repo / want to use the .npmrc from root then update / delete this file.

## Cloning the Repository

```
https://github.com/chief-jai/starwars.git
```

```
cd starwars
```

## Installing Dependencies

```
npm install
```

## Running the Application

```
npm start
```

## Testing Approach

We use Jest and React Testing Library for unit testing and Playwright for E2E testing.

### Run Unit tests

To run all tests:

```
npm run test
```

You can also pass any option supported by the [Jest CLI](https://jestjs.io/docs/cli). For example, to run the tests in a specific file:

```
npm run test -- [filename]
```

### Run E2E tests

To run e2e tests with UI

```
npm run test:e2e
```

To run e2e tests as headless

```
npm run test:e2e:headless
```
