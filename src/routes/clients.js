const { Router } = require("express");
const router = Router();
const clientsCtrl = require("../controllers/clients");

router.get("/", clientsCtrl.getClients);
router.get("/:id", clientsCtrl.getClientById);

module.exports = router;
