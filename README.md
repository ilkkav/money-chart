This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# Description

Visualize bank account events over time. Currently, only Nordea account data format supported.

## Run locally

### Install

`$ npm install && cd client && npm install & cd ..`

### Run server

`$ npm start`

### Run client

`$ cd client && npm start`

Open http://localhost:3000 in your browser.

App runs with an example data set. To import your own Nordea account data,

* download your account events from Nordea and save them in a local file
* click "Choose file" and select your local file

money-chart never saves or sends your account data to a third party. 

## Run tests

In project root:

`cd client && npm test`

## Live example

https://murmuring-dusk-94556.herokuapp.com/
