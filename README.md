For the frontend, I decided to follow the suggestion of using the Material UI to speed up the development of the UI.

I opted for collapsible tables so its easier to visualize the data and reduce clutter.

To create a fast development environment without too much hassle, I used the Vite package because Create React App is deprecated and Vite seemed easy to setup.

When the frontend starts, it sets up a websocket connection to the backend and is always listening to the backend for a message to know when the uploaded data is done being
integrated in the database and when it receives it, it calls an endpoint to get the data and re renders the page once it finishes.

If theres already data in the database it just calls the endpoint and gets the data from the backend.

To setup the websocket connection and manage it, I used the @rails/actioncable package because its official and its always maintained.

To run the frontend execute the following commands:

  npm install
  npm run dev

Afterwards it will show the URL of the frontend in the terminal.