"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const express_query_boolean_1 = __importDefault(require("express-query-boolean"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const webhooks_controller_1 = require("./modules/webhooks/webhooks.controller");
const spotify_controller_1 = require("./modules/spotify/spotify.controller");
// initialize app
exports.app = (0, express_1.default)();
exports.app.set('trust proxy', 1);
exports.app.set('views', 'src/views');
exports.app.set('view engine', 'ejs');
exports.app.use(body_parser_1.default.json({
    type: 'application/json',
    limit: '5mb'
}));
exports.app.use((0, express_query_boolean_1.default)());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
// Configure routes
exports.app.get('/health', async (req, res) => {
    return res.sendStatus(200);
});
exports.app.use('/webhooks', webhooks_controller_1.webhooks);
exports.app.use('/spotify', spotify_controller_1.spotify);
exports.default = exports.app;
//# sourceMappingURL=app.js.map