# Pomodoro

## Installing

0. Install node (I recommend using [NVM](https://github.com/nvm-sh/nvm))
1. Clone the Repo
2. Browse to the Pomodoro folder
3. Install applicatication by running: 
    ```sh
    $ npm install
    ```
4. Create a .env file with the following varibles:
    ```
    BOT_TOKEN="Here you must enter the token provided by Botfather"
    ```
5. To start the pomodoro bot run:
    ```sh
    $ npm start
    ```
    Or
    ```sh
    $ npm run dev
    ```

## To do:

- [x] Test the timer [MVP](https://github.com/ArthurPieri/Pomodoro/tree/basic)
- [x] Create a [CLI](https://github.com/ArthurPieri/Pomodoro/tree/cli)
- [x] Create a [Webserver](https://github.com/ArthurPieri/Pomodoro/tree/webserver)
- [x] Create [Users](https://github.com/ArthurPieri/Pomodoro/tree/users)
- [x] Create a [Telegram bot](https://github.com/ArthurPieri/Pomodoro/tree/telegram-bot)
    - [ ] Create events chaining
    - [ ] Enable text configuration (e.g. /work 30 -> Start a pomodoro with 30 min duration)
    - [ ] Enable inline bot
- [ ] Create Frontend