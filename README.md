Install node modules with `npm install`.

Run the app with `npm start`.

Drag and drop implemented from: https://codesandbox.io/s/k260nyxq9v.

This is a front end application example. In order it to run, first run the API from https://github.com/martintints/ContactsDemo

This application:

- displays contacts list
- has functionality to sort contact list with drag and drop
- saves new sequence to db after drag and drop
- has functionalty to add new contact
- has functionalty to edit existing contact
- has functionality to delete existing contact
- displays pop up notifications (toast) when completing actions like add/edit/delete contact
- displays errors when adding/updating/deleting contact does not succeed
- has navigation
- displays loading spinner when data is not fetched yet

Solution steps:

- First I created contact list to display all contacts.
- Then I added drag and drop and used third-party solution, since it is good practise to use already existing solutions and therefore speeds up development.
- Then I created adding/editing/deleting functionality.
- Then I added displaying errors
- Then I decided to add pop up notification (toast) to inform user that action has been performed.
- Then I added saving new sequence when performing drag and drop. The algorithm: take the sequences of previous and next contacts, and find the number exatcly between them and add this as a new sequence.
- Then I decided to add loading spinner to show user when data is being fetched
