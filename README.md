# Instructions to Run Project

**Note: Please use Node version 20.8.1. If an error occurs, delete `node_modules` and follow the steps again.**

1. Navigate to the server directory:
    ```bash
    cd server
    npm install
    node server.js
    ```


2. Open a new terminal and run the following commands:
    ```bash
    cd personal-budget
    npm install --force
    export NODE_OPTIONS=--openssl-legacy-provider
    ng serve
    ```

# Instructions to Run Test Cases

**Note: A browser popup will appear while running these commands, displaying the test results.**

## Unit Tests

```bash
cd personal-budget
ng test
```
### Unit Test Results
![UnitTest](./screenshots/Testing/unit_test_main.png)

## E2E:
The test cases location can be found at: 

`Nbad-Final-Project/personal-budget/cypress/e2e`.


**Note: For running e2e test case both the backend server i.e. node server.js and ng serve should be up and running.**

```bash
cd personal-budget
export APPLITOOLS_API_KEY=UGT6SGZonA5GCD8mlXSKnifPI1L1BJ2sC2LOAf105pjk4110
npx cypress open
```

After this, a Chrome pop-up will open with the following steps:

1. **Select E2E Testing.**
2. **Choose Chrome as the browser.**
3. **Click the "Start E2E Testing on Chrome" button.**
4. **Select the desired test case to run.**

If you encounter the following error message:
```plaintext
Sorry, we could not load: http://localhost:4200/home
```

1. **Restart both the backend server (node server.js) and the frontend server (ng serve).**
2. **Try running the above commands again. This should resolve the issue.**

### E2E Results 
Full screenshots can be found at: 

 `Nbad-Final-Project/screenshots/Testing`.

![LoginPageTest](./screenshots/Testing/TestResult/crop_login_page_test.png)
<img src="./screenshots/Testing/TestResult/crop_login_page_test.png" alt="LoginPageTest" width="300">

![VisualRegressionLoginCorrect](./screenshots/Testing/TestResult/crop_visual_regression_login_correct_test.png)
![VisualRegressionLoginIncorrect](./screenshots/Testing/TestResult/crop_visual_regression_login_incorrect_test.png)
![VisualRegressionVistPB](./screenshots/Testing/TestResult/crop_visual_regression_visit_pb_test.png)

# Screenshots:

### HomePage
![HomePage](./screenshots/HomePage.png)

<br>

### AboutPage
![AboutPage](./screenshots/Aboutpage.png)

<br>

### Login
![LogIn](./screenshots/LoginPage.png)

<br>

## Register
![Register](./screenshots/SignupPage.png)

<br>

## Dashboard
![Dashboard](./screenshots/DashBoard.png)

<br>

## Expense Table according to selected month
![ExpenseTable](./screenshots/ExpenseTable.png)

<br>

## Charts
![Charts](./screenshots/Charts.png)

## Contact Page
![Contact](./screenshots/ContactPage.png)
