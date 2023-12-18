## Description

Deep links not working correctly if a user needs to log in beforehands.

When a user who is not logged in tries to access a private route, such as `/users/metrics`, they are correctly redirected to the login page. However, after logging in, they are redirected to the home page instead of the route they initially wanted to visit.

To address this issue, we are now using a `redirectTo` query URL parameter to store the initial route. This parameter is then used for the redirect after the user logs in.

## Changes

- Authentication guard now adds `redirectTo` URL query parameter when a user is redirected to the login page.
  - The parameter contains the URL of the route the user initially tried to access.
- After the user logs in, the authentication handler redirects the user to the appropriate route based on the `redirectTo` parameter.

## PR Checklist

- [x] I have self-reviewed the code before publishing a PR
- [x] I have followed code quality and best practice standards
- [x] Changes have been tested locally and do not introduce new issues
- [x] Added new environment variables to the `.env.example` file
