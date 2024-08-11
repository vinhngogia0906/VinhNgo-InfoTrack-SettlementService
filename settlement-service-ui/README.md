# InfoTrack Settlement Service UI

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). This application serves as an User Interface to communicate with the [InfoTrack Settlement Service Engine](https://github.com/vinhngogia0906/VinhNgo-InfoTrack-SettlementService/tree/main/SettlementService) application.

## Prerequisites

It is recommended that you have these below software installed:
- [NodeJs](https://nodejs.org/en/download) - NodeJs version v20.16.0
- [Npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) - Npm version v10.8.2 at least.
- [Visual Studio Code](https://code.visualstudio.com/download) - Recommended IDE

## Getting Started
This is how you setup and run the project locally on your enviroment.

1. Open the `settlement-service-ui` folder inside the cloned [repository](https://github.com/vinhngogia0906/VinhNgo-InfoTrack-SettlementService) with Visual Studio Code.
2. Install all the inlisted package (only after you meet all the version requirements above):
```
npm install 
```
3. Follow the [InfoTrack Settlement Service Engine](https://github.com/vinhngogia0906/VinhNgo-InfoTrack-SettlementService/tree/main/SettlementService)'s instruction to start it up in debug mode.
4. Check the Uri and the listening port from your local set up of [InfoTrack Settlement Service Engine](https://github.com/vinhngogia0906/VinhNgo-InfoTrack-SettlementService/tree/main/SettlementService) and update it in the `.env` file if not match. In this case it is `https://localhost:7206/api/Booking`, but it might be different when you start debugging in your environment.
5. Run the application with this command.
```
npm run start
```
6. Navigate to `http://localhost:3000/`. The application will automatically reload if you change any of the source files.

7. Use the form to submit your booking entry for InfoTrack Settlement Service.
![Booking submission form](image-1.png)
![Booking confirmed](image-2.png)
![Booking is outside of business hours](image-3.png)


## Available Scripts

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
