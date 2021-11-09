# HOLIND

HOLIND is a web app that provides incentive to patients for continuing therapy outside of clinical visits. This project aims to improve patient outcomes by keeping the patient accountable for continued therapy.

## Getting Started

### Prerequisites

You will need to have Node.js installed [https://nodejs.org/en/download/](https://nodejs.org/en/download/).

#### Run `npm install` in the main directory, the frontend folder, and the backend folder.

### Available Scripts

In the project directory, you can run:

#### `npm run frontend`

Runs the frontend in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm run backend`

Runs the backend server on port 5000 using nodemon.

#### `npm run dev`

Runs the frontend and backend at the same time using concurrently.

## Testing

### Backend Testing

#### (In the backend folder) `npm test`

Run the jest test suite.

#### (In the backend folder) `npm run test-coverage`

Run the jest test suite and generate a coverage report.

### Frontend Testing

## Deployment

### Heroku Deployment

#### `heroku login`

Login to heroku using the heroku CLI. Must have the heroku CLI downloaded. [https://devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)

#### `heroku git:remote -a holind`

(Only needed once) Set the github repository as the remote for the heroku repository.

#### ``git push heroku `git subtree split --prefix backend main`:main --force``

Deploy backend to heroku.

### Firebase Deployment

#### `firebase login`

Login to firebase using the firebase CLI. Must have the firebase CLI installed. [https://firebase.google.com/docs/cli?authuser=0#install_the_firebase_cli](https://firebase.google.com/docs/cli?authuser=0#install_the_firebase_cli)

#### (In the frontend folder) `npm run build`

Create the react optimized production build folder to be deployed.

#### (In the frontend folder) `firebase deploy`

Deploy the frontend to firebase.

## Technologies Used

- React
- Node.js/Express
- Firebase
- Heroku
- Jest/Supertest
- Cypress

## Contributing

#### New developers will need access to the GitHub repository, Firebase Project, and Heroku Project.

#### Project Website: [https://tarheels.live/holind/](https://tarheels.live/holind/)

## Authors

- #### Kevin Lu – klu13@live.unc.edu

- #### Long Le – lelong@live.unc.edu

- #### Brianna Li – brili24@live.unc.edu

- #### Jackson Lei – jylei@live.unc.edu

## License

## Acknowledgements