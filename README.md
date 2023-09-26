# How to run

## Requirements

- nodejs
- Docker
  If you don't want to use docker, you will have to run the dockerized services by yourself. Those services are:
- Postgress DB
- Prometheus

## Installation

For First time running the service.

- Install all the required dependencies by using your favourite package manager. `yarn intall` or `npm install` or whatever you prefer.
- Copy .env.example to .env `cp .env.example .env` and update the `DATABASE_URL` in .env file.
- Get postgress and prometheus running with docker `docker-compose up --build -d`
- After postgress is up and running, we need to migrate the database for that run `npx prisma migrate dev`
- To seed the data on the database run `npx prisma db seed`

These steps are only needed for first time setup of the service.
Now to run the service, all you need to do is

```
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

After the service is run, by default you can access the service in `localhost:4000`.
The graphql playground can be found in `localhost:4000/graphql`.
The service metrics are exposed in `localhost:4000/metrics`. Those metrics are scrapped by prometheus running locally on a docker container on port 9090. You can access that on `localhost:9090`.
Right now for the sake of simplicity, I am only reporting the time it took to quey data from the data for the metrics.

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## What next?

- Work more on observability of the system(tracing and metrics). Connect prometheus and grafana to get better visibility of the metrics.
- For optimization and reducing load to the database, add caching may be redis.
- The whole job of authentication is not done yet. Add some kind of identity provider OAuth, Auth0, keycloak etc.
- Ratelimiting
- etc
