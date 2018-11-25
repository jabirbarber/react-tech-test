
# Cover Note

The following submission of the tech test is implemented in ReactJS using Redux for state management and Redux-Thunk for ansyncrony.
To get started, clone the repo and run npm install followed by npm start from the root of the project.





-------------------------------------------------------------


# Scrabble Club (React)

## Introduction

For some time now we have used the “Scrabble Club” as our baseline technical test for developers, and we have seen other organisations use the same test for their technical entrance. It has served us all well.

The aim of this exercise is simply to demonstrate the way that you approach a problem and the general style of your coding. We are not concerned about design or styling at this stage. The problem should not take more than one or two hours. Elder Studios delivers solutions through React or React Native, it would help if you did the same.

## The Brief

The Scrabble Club has a JSON API which stores a members’ information and provides leaderboards to show their top performing players.

They now need a front end for displaying the information that their API provides. *Unfortunately, the API doesn't map exactly to each screen/pages requirements.*

All recorded Scrabble games are head-to-head matches between two users; the user with the higher score at the end of the game wins.

You should provide, in order of priority:

- A leaderboard screen showing 10 results
  - Displaying the users name
  - Number of wins
  - Number of losses
  - Average score
- Ability to sort the leaderboard by the number of wins (returned by default)
- Ability to sort the leaderboard by the average scores
- A users profile screen showing the users
  - the number of wins.
  - the number of losses.
  - their average score.
  - their highest score, when and where it was scored, and against whom.
  - A list of games that user has won (paginated 5 results)
- A member's profile screen allowing you to edit the member's name, email and username.

## The Deliverable

It would be desirable to use a form of VCS during this test, our preference is Git. Services such as GitHub, Gitlab or BitBucket is not required, a local git repository is sufficient for this demonstration. Remember to include a covering note or readme file explaining the technology choices you have made and instructions required to run your solution.

Please send a bundled repository showing your commit history or a link to an accessible private repository with your work via email.

  `git bundle create <yourname>.bundle --all --branches`


## Marking Guidance
While evaluating your submission here is a few things that we consider:

- How you interact with the API
- Solution design
- Quality code that uses approriate design patterns
- Validation/feedback 
- Use of VCS - As evidenced by git history
- Reusable components such as buttons, form fields etc
- Immutability and state management
- Security best practices applied
- Good understanding of errors and how to handle them

## Getting Started
- Feel free to fork this repo if required or copy the `docker-compose.yml` into your projects root directory.
- Install Docker and Docker Compose: https://docs.docker.com/compose
- Start the mock api by typing `docker-compose up` from your projects root directory in your terminal
- Confirm that the API documentation loads at: `http://localhost:3000/`
- Confirm that the list of users loads at `http://localhost:3000/users`
