# vue-table

This is a small exercise to build a table component using vue. My approach was to keep the component as simple as possible where how it renders is dependent only on the props that's been passed to it. I was thinking of making a composable table by using slots but it might end up just becoming unnecessary overhead.

---

## Deployment

I'm using netlify for hosting. Deploy process is to push to github and it will trigger a build in netlify.

---

## Follow-up Questions
1. How long did you spend on the test? Would you do anything differently if you had more time?

I spent about 6 hours to on the test. I would probably keep working on it to improve the design, functionality, accessibilty, reusability and test coverage of the component.

2. In what ways would you adapt your component so that it could be used in many different scenarios where a data table is required?

I think the search functionality can be improved so that it can also handle non string values.

3. What is one CSS property that you recently learned about that helped you solve a problem?

Not specific for this project, but I picked up css grids recently and it's changing the way I layout project I'm currently working on.

---

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
