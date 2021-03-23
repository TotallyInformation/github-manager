const report = require('yurnalist') // https://www.npmjs.com/package/yurnalist
 
/* A function to fake some async task */
function waitNumberOfSecs(secs) {
  return new Promise((resolve) => setTimeout(resolve, secs * 1000));
}
 
async function fetchSomething() {
  report.info('Please wait while I fetch something for you.');
  report.warn('It might take a little while though.');
 
  const spinner = report.activity();
  spinner.tick('I am on it!');
 
  try {
    await waitNumberOfSecs(1);
    spinner.tick('Still busy...');
    await waitNumberOfSecs(1);
    spinner.tick('Almost there...');
    await waitNumberOfSecs(1);
    report.success('Done!');
  } catch (err) {
    report.error(err);
  }
 
  spinner.end();
}
 
fetchSomething();