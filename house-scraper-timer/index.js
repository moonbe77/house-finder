require("./initServerless");
const scrapWebsiteOne = require("./scrapWebsiteOne");
const sendEmail = require("../utils/sendEmail");

module.exports = async context => {
  const { log } = context;
  global.log = log;
  const timeStamp = new Date().toISOString();
  log("Trigger time", timeStamp);
  try {
    const websiteOneData = await scrapWebsiteOne();
    log(`Got ${websiteOneData.length} of matches in total`);
    await sendEmail(websiteOneData);
  } catch (e) {
    log("Failed to scrap due to an error ", e);
  }
  context.done();
};
