cd server
npm install
node server.js

please use node 20.8.1 version and if there come an error please delete node_nodules and again rerun the commands

npm install --force
export NODE_OPTIONS=--openssl-legacy-provider
ngserve


To run test case:
Unit tests

ng test

E2E:

export APPLITOOLS_API_KEY=UGT6SGZonA5GCD8mlXSKnifPI1L1BJ2sC2LOAf105pjk4110

npx cypress open