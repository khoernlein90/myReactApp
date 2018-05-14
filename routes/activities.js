const router = require("express").Router();
const activityController = require("../controllers/activityController");
const path = require("path");

router
  .route("/api/activity")
  .get(activityController.findAll)
  .post(activityController.create);

router
  .route("/api/activity/:id")
  .get(activityController.findById)
  .put(activityController.update)
  .delete(activityController.remove);

router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build.index.html"));
});
module.exports = router;
