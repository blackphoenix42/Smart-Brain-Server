<div align="center">

<!-- ![Issues](https://img.shields.io/github/issues/blackphoenix42/Smart-Brain-Server)
![Pull Requests](https://img.shields.io/github/issues-pr/blackphoenix42/Smart-Brain-Server)
![Forks](https://img.shields.io/github/forks/blackphoenix42/Smart-Brain-Server)
![Stars](https://img.shields.io/github/stars/blackphoenix42/Smart-Brain-Server)
[![License](https://img.shields.io/github/license/blackphoenix42/Smart-Brain-Server)](https://github.com/blackphoenix42/Smart-Brain-Server/blob/master/LICENSE) -->

<img alt="LOGO" src="./.github/assets/logo.jpg" width="500">
<h3>Smart Brain</h3>
<h4>Join official <a href="https://discord.gg/mRUZEhD">Discord Server</a> for discussion.</h4>

![forthebadge](https://forthebadge.com/images/badges/check-it-out.svg)
![forthebadge](https://forthebadge.com/images/badges/uses-brains.svg)
![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)

</div>

# 📃About

An app that uses [Clarifai Api](https://www.clarifai.com/models/ai-face-detection) to detect the face in an image from an URL. Backend and Frontend are hosted on Heroku.

# 🌱 Quick Start

- Star🌟 and Fork<img width="15px" src="https://img.icons8.com/doodle/48/000000/code-fork.png"/> this repository

- Clone this repository remotely.

```sh
git clone https://github.com/blackphoenix42/Smart-Brain-Server.git
```

# 🕹Setup on your local machine

- Install the dependencies

```sh
npm install
```

- Download and install [PostgreSQL🐘](https://www.postgresql.org/download/)

- Create database `smart-brain` or any of your choice.

- Create following tables:

Login:

```sql
CREATE TABLE login(
	id serial PRIMARY KEY,
	hash varchar(100) NOT NULL,
	email text UNIQUE NOT NULL
)
```

Users:

```sql
CREATE TABLE users(
	id serial PRIMARY KEY,
	name VARCHAR(100),
	email text UNIQUE NOT NULL,
	entries BIGINT DEFAULT 0,
	joined TIMESTAMP NOT NULL
)
```

- In `./server.js` file update the following:

```javascript
const db = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "test123", //Whatever Password You set in Postgres
    database: "smart-brain", // Name of Your Database
  },
});
```

- Now go to [Clarifai](https://www.clarifai.com) and sign up. You will be provided with a default `my-first-application`. Copy its API KEY.

- Now go to `./controllers/image.js` and change the following function:

```javascript
const app = new Clarifai.App({
  apiKey: "YOUR API KEY",
});
```

- Start the server

```sh
npm start
```

<div align="center"><img width=35%" src="https://i.giphy.com/media/wABP9NJXf4LEssRZ2s/giphy.webp" ></div>

## 🚀 How to Contribute to Project?

- Take a look at the Existing [Issues](https://github.com/blackphoenix42/Smart-Brain-Server/issues) or create your own Issues!
- Check out [CONTRIBUTING.md](./CONTRIBUTING.md)

<div align="center">
	<img src="./.github/assets/ToDo.svg" width="50%">
</div>

## 👾 Project Admin

<table>
	<tr>
		<td align="center">
			<a href="https://github.com/blackphoenix42">
				<img src="https://avatars.githubusercontent.com/u/22915654?v=4" width="100px" alt="" />
				<br /> <sub><b>blackphoenix42</b></sub>
			</a>
			<br /> <a href="https://github.com/blackphoenix42">
		👑 Admin
	    </a>
		</td>
	</tr>
</table>

<!-- ## 🌟 Contributors

<table>
	<tr>
		<td>
			contrib.rocks
			</a>
		</td>
	</tr>
</table> -->
