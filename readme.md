# Starting with graphQL

One Paragraph of project description goes here

## Getting Started

These instructions will get you a copy of the project up and running on your
local machine.

### Prerequisites

* Node
* Yarn

### Installing

A step by step serie to start project

```
npm install
```

To run project:

```
yarn start
yarn json:server
```

Go to www.localhost:4000/graphql and add this to display user.

```
{
    user(id: "24") {
        id,
        firstname,
        lastname
    }
```

## Built With

* [GraphQL](http://graphql.org/) - A query language for API's.
* [Axios](https://github.com/axios/axios) - Promise based HTTP client for the
  browser and node.js.
* [Node](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8
  JavaScript engine.
* [Typescript](https://www.typescriptlang.org/) - Programming language.
* [Json-server](https://github.com/typicode/json-server) - Fake REST API with
  zero coding.

## Authors

* **Samuel Gustafsson** - _Initial work_ -

## License

This project is licensed under the MIT License - see the
[LICENSE.md](LICENSE.md) file for details
