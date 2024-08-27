src
│ app.js # App entry point
└───api # Express route controllers for all the endpoints of the app
│
└─── middleware # Having a folder for that is good practice for tasks like authentication and validations. This would not pile up our service folder and allow it to focus on core business logic and improve security.

└───config # Environment variables and configuration related stuff. This is for your database connection and configuration.
└───jobs # Jobs definitions for agenda.js
└───loaders # Split the startup process into modules
└───models # Database models
└───services/controllers # All the business logic is here
└───subscribers # Event handlers for async task
└─── test #
└───utils(folder) # The Utils folder can store reusable functions and logic that can be exported and used across various parts of your application. Utils also enhance codebase maintainability and readability by promoting the DRY (Don’t Repeat Yourself) principle.
└───.gitignore(file) #
└───.env(file) #

<!-- for dependency injection -->

- For projects with a small number of dependencies or where conciseness is preferred, direct injection without @Inject annotations may be a better choice.
- For larger projects with many dependencies or where clarity and explicit declaration of dependencies are important, using @Inject annotations can be beneficial.
