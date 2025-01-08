const router = require("express").Router();

const STEPS = [
  [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      required: true,
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
    },
    {
      name: "bio",
      label: "Bio",
      type: "multiline-text",
    },
  ],
  [
    {
      name: "country",
      label: "Country",
      type: "text",
      required: true,
    },
    {
      name: "receiveNotifications",
      label:
        "I would like to receive email notifications for new messages when I'm logged out",
      type: "yes-no",
      required: true,
    },
    {
      name: "receiveUpdates",
      label: "I would like to receive updates about the product via email",
      type: "yes-no",
      required: true,
    },
  ],
];

const methodNotAllowed = (req, res, next) => {
  return res.header("Allow", "GET").sendStatus(405);
};

const getOnboarding = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    return res.status(200).json({ steps: STEPS });
  } catch (error) {
    next(error);
  }
};

router.route("/").get(getOnboarding).all(methodNotAllowed);

module.exports = router;
