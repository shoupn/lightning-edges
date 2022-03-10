## Description
Example of how to use nest and graphql to insert nodes and associated info into 


## Installation 
I used npm as the preferred package manager. Could also use yarn. 
For this project I used npm version 7.21.0 and node version 16.8.0

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

Tests were not included as were not part of requirement


### Query and Mutations Requirements

Query: getEdges
- Get an array of all the edges stored in the database.
- Query: getEdge
- Get one edge based on the id. The query needs an id argument.
- Mutation: createEdge
- Create a new edge in the database. The mutation needs the node1_alias and
node2_alias as arguments.
- After the new edge is saved in the database, send the object to a RabbitMQ
queue.

```
query getNodes {
  getEdges{
    node1Alias
    node2Alias
    createdAt
    updatedAt
    capacity
  }
}


query getNode{
  getEdge(id: 1){
    node1Alias
    node2Alias
    capacity
    createdAt
    updatedAt
  }
}

mutation {
  createEdge(input: {node1Alias: "nodeAlias", node2Alias: "nodealias2"}) {
		id
    node1Alias
    node2Alias
    createdAt
  }
}

```