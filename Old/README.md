# Pomodoro

## Installing

0. Install node (I recommend using [NVM](https://github.com/nvm-sh/nvm)) and MongoDB
1. Clone the Repo
2. Browse to the Pomodoro folder
3. Install applicatication by running: 
    ```sh
    $ npm install
    ```
4. Create a .env file with the following varibles:
    ```
    BOT_TOKEN="Here you must enter the token provided by Botfather"
    PORT="Enter the port for your app"
    MONGODB_URL="Enter the Mongo DB URL"
    ```
5. To start the pomodoro-CLI run:
    ```sh
    $ npm start
    ```
6. If you want a CLI command to be installed globaly:
    ```sh
    $ npm install -g
    ```

## To do:

- [x] Test the timer [MVP](https://github.com/ArthurPieri/Pomodoro/tree/basic)
- [x] Create a [CLI](https://github.com/ArthurPieri/Pomodoro/tree/cli)
- [x] Create a [Webserver](https://github.com/ArthurPieri/Pomodoro/tree/webserver)
- [x] Create [Users](https://github.com/ArthurPieri/Pomodoro/tree/users)
- [ ] Create a [Telegram bot](https://github.com/ArthurPieri/Pomodoro/tree/telegram-bot)
- [ ] Create Frontend