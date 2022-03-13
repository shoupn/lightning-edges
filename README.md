## Objective
- Build a GraphQL API using NestJS that does basic CRUD operations into a Postgres
database and that sends events into a RabbitMQ queue.
- The same NestJS server should be listening to events from this RabbitMQ queue and
handle them correctly.
- Everything should be written and well typed using Typescript.

Built using NestJs, and GraphQLModule

## Requirement for building and running 
I used yarn as the preferred package manager. Could also use npm. 
For this project I used 
- yarn version v1.22.17 
- node version 16.8.0
- Docker version 20.10.12 
- docker-compose version 1.29.2
Your versions may vary, but this is what I used. 

## Installation 
clone project using `git clone https://github.com/shoupn/lightning-edges.git`

cd `lightning-edges`

from terminal run
```bash
$ yarn install
```
Should be ready to go
## Running the app
from the root of the project run `docker-compose up` to create and bring up a containers
for both the postgres edges DB and the required instance of RabbitMq. The postgres DB is connected to and 
exposed on default 5432 (can look up the connection props in the .env file or project),
and the RabbitMQ instance is using default as well `guest:guest@localhost:5672`.
There is an `initdb.sh` shell script that will create the `edges` DB for the application to connect to. 
Ports are mapped straight across from the container to the same port on your local host. 
Once the containers are brought up, you can start the microservice, using either below. 

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev
```

The microservice is running on port 3000, 
http://localhost:3000/graphql running using the dev or watch mode will open up the graphql playground


### Query and Mutations Requirements

- Query: getEdges
  - Returns an array of all the edges stored in the database.
- Query: getEdge
  - Get one edge based on the id. The query needs an id argument.
- Mutation: createEdge
  - Creates a new edge in the database. The mutation needs the node1_alias and
node2_alias as arguments.
- After the new edge is saved in the database, send the object to a RabbitMQ
queue. 

The resolver class handles the incoming graphql requests and called down to the service layer. 
The service layer is using TypeOrm for all updates to the postgres Db and fetching data.  

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
## Tests
Tests were not included as were not part of requirement
