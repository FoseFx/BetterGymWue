"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const server = app_1.default.listen(app_1.default.get("port"), () => {
    console.log("Running Server");
});
exports.default = server;
//# sourceMappingURL=server.js.map