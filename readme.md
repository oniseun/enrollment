
## About Loan APP

Using Express JS, Firestore and Docker create a dockerized simple Student Management Application APIs with the following modules.

## EndPoint Summary


-  **/api/user/register** <POST>
creates a new user in the system

ACCEPTS: first_name, last_name,  email, password, gender, dob, password

RETURNS (if successful) : verify_token - should be used to verify email

-  **/api/user/verify-email/<verify_token>** <POST>
logs in a regisered user to the system

ACCEPTS: verify_token

RETURNS (if successful) 

-  **/api/user/login** <POST>
logs in a regisered user to the system

ACCEPTS: email, password

RETURNS (if successful) : user *access_token* - which should be passed as Authorization bearer header across all request


-  **/api/enrollments/courses** <GET> *requires Authorization header*

RETURNS:  list of available cousres

-  **/api/enrollments/create** <POST> *requires Authorization header*

ACCEPTS: course_id

RETURNS (if successfull) : *data* - loan Application details

-  **/api/enrollments/list** <GET> *requires Authorization header*

RETURNS:  list of successful enrollments by user

-  **/api/enrollments/delete** <DELETE> *requires Authorization header*

ACCEPTS: enrol_id
RETURNS: deletes enrollment 


## Other details
-  Change the config/serviceAccountSample.json file to to serviceAccount.json downloaded from firebase console
-  One Database [ firebase]  with 3 collections [ users, enrollments, email_verification ]
-  install all packages by running **npm install**
-  start app with **npm start**
