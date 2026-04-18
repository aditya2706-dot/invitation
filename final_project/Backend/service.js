const RSVP = require("./model");

const saveRSVP = async (rsvpData) => {
  const rsvp = new RSVP(rsvpData);
  await rsvp.save();
  return rsvp;
};

module.exports = {
  saveRSVP,
};
