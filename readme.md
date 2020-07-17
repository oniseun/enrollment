
## About Loan APP

A system designed to allow customers to create profile (imagine basic user bio data) and apply for loans.

## EndPoint Summary


-  **/api/user/create** <POST>
creates a new user in the system

ACCEPTS: name, phone, email, password, address

RETURNS (if successful) : accessToken - which should be passed as Authorization bearer header across all request

-  **/api/user/login** <POST>
logs in a regisered user to the system

ACCEPTS: phone, password

RETURNS (if successful) : user *bioData* and *accessToken* - which should be passed as Authorization bearer header across all request

-  **/api/loans/existing** <GET> *requires Authorization header*

RETURNS:  list of available loans and serial number

-  **/api/loans/apply** <POST> *requires Authorization header*
Applies for loan 

ACCEPTS: loanSN (loan serial number from existing loan list)

RETURNS (if successfull) : *loanData* - loan Application details

-  **/api/loans/running** <GET> *requires Authorization header*

RETURNS:  list of successful loan applications by user

-  **/api/user/list** <GET> *requires Authorization header*

RETURNS: list of registered users


## Other details

-  One Database [ loans.json]  with 3 collections [ users, existingLoans, loanApplications ]
-  Database and collections are stored in-memory with loki.js and automatically destroyed on application close
-  install all packages by running **npm install**
-  start app with **npm start**
-  run test with **npm test**
