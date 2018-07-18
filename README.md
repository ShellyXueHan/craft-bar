
# Website for Craft Bar


## Features:
- Website is hosted [here](https://craft-bar-express.herokuapp.com/)
  - CRUD of beers
  - Employee login/logout (could try:
    -  username: Boss
    - password: 123456 )
  - Mobile friendly
- Backend, testing, frontend
- [Agile approach]((https://trello.com/b/cFSZD5vf/craft-bar-website))
<hr>

## Technical details:
### Backend:
- Express
- Node.js
- Knex with postgres
- Heroku cloud platform
- JWT (login session token cookie)
<br />
<br />

### Unit Testing:
 - Jest
 - Supertest
<br />
<br />

### Functional Testing:
 - Details in [Trello ticket](https://trello.com/c/noff6RW2/1-test-planning-and-documentation)
   - Behaviour Driven Development Testing
   - Criterion
 - Automated testing: [sample from previous work](https://github.com/bcgov/range-web/tree/BDDTest)


### Frontend (minimal work):
 - Handlebars
 - Boostrap (**support mobile view**)

<hr>

## Agile strategy:
- [Trello board](https://trello.com/b/cFSZD5vf/craft-bar-website)
- TDD for API unit testing
- BDD for API design

<hr>

## Installation steps:

### Development (localhost):
`npm install`

install node dependencies

`createdb craft-bar-dev |`

setup database

`knex migrate:latest | knex seed:run`

database setup

`psql craft-bar-dev | select * from beers;`

check database with populated data

`nodemon`

run the app and access it at localhost:3000

<hr>

### Test:
`npm run lint`

pre-test: lint check the formatting accoring to facebook style, set in .eslintrc.js file

`npm run test`

this will execute the jest test, there are 5 unit test cases. [details](https://trello.com/c/zEy3WEgP/10-api-unit-testing)

<hr>

### Production:
`npm run pre-deploy`

change the environment to deployment so that database connection will work

`heroku login`

use [Heroku](https://www.heroku.com) for could platform hosting

`heroku config` &  `heroku apps`

check Heroku setup and make sure there is Heroku Postgres db

`heroku run knex migrate:latest`

`heroku run knex seed:run`

setup prod database

`git push heroku master`

push the project to Heroku and deploy

<hr>


### Reference:
- [Unit testing](http://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/)

- [Express](https://github.com/w3cj/Full-Stack-JavaScript-CRUD/tree/master)

- [JWT](https://medium.com/@patrykcieszkowski/jwt-authentication-in-express-js-ee898b87a60)
