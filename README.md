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

# serve in dev mode, with hot reload at localhost:3000
npm run dev

# build for production
npm run client:build

# serve in production mode
npm start


