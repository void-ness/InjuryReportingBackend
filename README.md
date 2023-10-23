## Introduction
An injury tracking system which allows the users to report injuries in an efficient manner. Easy access copuled with functionalities to sort records on a variety of parameters, makes it a great choice for organisations such as Police, Schools. 

The given repository is an Apollo Server which is used to handle the incoming request from Injury Tracking System - Frontend. 

## Features Covered
- [x] Add new reports
- [x] Update existing reports
- [x] Delete existing reports using their report-id
- [x] Search for a reports on the basis of a filter (reporter name)
- [x] Order reports on the basis of name / injury datetime / report datetime
- [x] Filter reports on the basis of starting and ending injury / report date
- [x] authenticate users using a JWT token and block access to protected resources from unauthorized users.


## Features Pending
- [ ] Store information about bodymap and injury details

## Technologies Used
- ApolloServer - for creating the graphql compliant webserver
- Prsima - for database connectivity
- MongoDB Atlas -  Database
- Bcrypt & JWT - for authentication and securely storing user credentials

*Note: Before running the project locally you need to create a `.env` file. A template for the same can be found in `example.env`*

**Frontend code** - [link](https://github.com/void-ness/InjuryReportingFrontend) 