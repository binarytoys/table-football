# table-football

## How to run this project

``` bash
# install dependencies
npm install
cd client
npm install
cd ..

# make a fix in vue material
- Locate node_modules\vue-material\dist\vue-material.js
- Search for isInvalidValue
- swap out the code:
    old:
        return this.$el.validity.badInput;
    new:
        return this.$el.validity ? this.$el.validity.badInput : false;

# define config parameters in file config/defult.json
- "db": use 'mysql' for using MySQL driver or "mem" for memory-based driver
- "mysql" section for MySQL driver:
    - "host": IP address of MySQL server,
    - "user": DB-user login,
    - "password": DB-user password,
    - "database": database/schema name,

# serve in dev mode, with hot reload at localhost:3000
npm run dev

# build for production
npm run client:build

# serve in production mode
npm start


