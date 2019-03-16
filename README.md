# expressjs es6 boilerplate

```
# Install
npm install
npm install -g nodemon bebel-node

# Run
npm run dev
```

## Command to create new model
First you need to link the command to system (for one time only):
```
npm link
```
Then:
```
genModel -m <modelName>
ex:
genModel -m user
```
A folder named `<modelName>` will be created inside the `packages` with the following files:

```
routes.js
validation.js
controller.js
service.js
repository.js
model.js
static.js
config.js
```
* *See `commands` folder and the [commander](https://www.npmjs.com/package/commander) npm package for more information.*

After generate model, you have to declare model and route in:
```
src/models.js
src/routes.js
```

## Error handling
To throw an custom error:
```
const errorObject = {
  code: -1,
  message: 'my custom error'
}
throw new Error(JSON.stringify(errorObject))

ex:
throw new Error(JSON.stringify(commonCode.dataAlreadyExisted))
```
The `errorObject` object will be sent to `error` variable in this call:
```
const [error, data] = await to(myFunction())
``` 

Other errors like system error...will be sent to `error` variable too.

## Auto deployment
Edit the `ecosystem.config.js` file and then:
```
pme deploy prod
```
