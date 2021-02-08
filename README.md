## MERN Stack Bloggin Website

This is blogging website created with MongoDB, Express, React and NodeJS. I created this site as a way to practice my skills with this Stack after following an online course. Creating projects like this on my own always help engrain the knowledge I've picked up.

The site is simple on the surface; users can view posts publicly and filter through categories to find what they're looking for. By creating an account users can add their own posts and add comments on other posts. User with admin status can view all posts and users and edit through their login.

This was also my first time using React-Bootstrap for components. This really helped me focus on the features of the app and spend less time considering CSS and the looks of the site - in this case I was happy to let bootstrap handle this for me.

## Project Status

I intend to begin using this site as a outlet for my own blogs and as a way of recording my process of leaning web development as I continue. There are still many features I would like to keep adding, such as a 'like' system, comment replies and the ability for users to upload images for their blogs.

## Project Screen Shots

![home page](https://github.com/mikeymuso/blog-site/blob/master/frontend/public/images/blogging-site.png)
![admin page](https://github.com/mikeymuso/blog-site/blob/master/frontend/public/images/admin-view.png)

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

Installation:

`npm install`

To Start Server and Frontend:

`npm run dev`

To Visit App:

`localhost:3000`

## Reflection

- This is one of my largest projects to date. It's a fully functioning app with persistent database storage and the ability to create/update and delete posts & users.

- After following an online course into the MERN stack I took what I'd learnt to start over and create my own app from scratch. With the information I had gathered through the course I was able to get the site up and running fairly easily and begin to expand the features from there

- There were many challenges in this project in setting up API routes and verifying that users had access to those routes. I used JWT to handle JSON web tokens and learnt how to store these as cookies for added security. Using JWT I assigned a user a token on succesful login and then used this token to verify communications therein.

- This was also my first time using bootstrap components which hugely helped with getting forms/layout up and running very quickly. This is something I will really consider using from now on.

- Before embarking on this project, API's, HTML status codes & requesting/reponding of data were relatively unfamliar to me apart from accessing simple API's for my weather API app. Dealing with creating my own API and using POSTMAN to check endpoints as well as passing information in headers/params & body as JSON helped me gain a much deeper understanding of how this works. I gained familiarity with Axiom too.

- This was my first usage of React Router also - I learnt how to use links, routes and the router to provide different components depending on the URL. It also introduced me to the use of the router props (match, history, location) to manipulate the URL, history and pass parameters in the URL. It also helped me implement conditional rendering for messages, loaders and also hiding access from non-admin users.

- In the backend I used Express to create an express app and implement middleware and handle the server. This was my first experience using Express and getting to grips with it was simple - however I feel that my knowledge of Express is still limited to the few requirements of this app

- NodeJS is very simple to use in a relation to JavaScript and I found working with this framework very intuitive. It was helpful to use "type": "modules" on the package.json to enable the use of 'import... from...' language, although I understand the use of 'require(...)' also.

- There were many new NPM packages I used in this project - colors, asynchandler, jwt, dotenv, morgan, body-parser, cookie-parser and bcrypt. I made the effort to consult the docs when I needed to achieve a certain task (before hitting google) which I found helped give me a better understanding of how these packages work and how I could use them to best advantage.

- Mongoose was another large hurdle for me. Understanding Schemas and Models was an entirely new area for me. I felt that this particular element of dealing with databases considerably easy to pick up and was able to grasp the linking of databases and getting/updating/deleting data to be fairly intuitive. I'd had some experience setting up a MongoDB before but this was the first time I'd used the MongoDB Compass app on mac. I will certainly use this in future to handle my databases.

- This was a large project for me, and while I struggled through some sections I felt that I always had a clear idea of what I needed to do and how to achieve it. I often found myself troubleshooting API requests but slowly understood what was needed in order to achieve regular succesful requests.

- I am aware that much of my code could do with refactoring and there are ineffeciences in place. I allowed myself some freedom with this for now as my main aim was to get a working app up and running which I could evaluate, and see where my weaknesses were and what I should consider when I work with this stack again.

- I also suffered from a little bit of feature creep and some loss of a clear direction during this project. I think that my lack of planning is to blame for this. I know in future that what time I spend in planning my app I would save in focus during the creation process.

## Future Improvements/Features

- I would like to add some real blogs!
- Add the ability to edit/delete comments
- Allow users to upload custom images for blogs
- Refactor code
