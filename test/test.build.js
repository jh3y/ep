var context = require.context('../src/script/', true, /.*\.test\.js/);
context.keys().forEach(context);
module.exports = context;
