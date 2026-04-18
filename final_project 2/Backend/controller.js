const { saveRSVP } = require("./service");

const handleRSVP = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Name is required" });
    }
    
    if (!email || email.trim() === "") {
      return res.status(400).json({ error: "Email is required" });
    }

    const rsvp = await saveRSVP({
      name: name.trim(),
      email: email.trim(),
      message: message ? message.trim() : ""
    });
    
    return res.status(201).json({ success: true, data: rsvp });
  } catch (error) {
    console.error("RSVP Controller Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  handleRSVP,
};
