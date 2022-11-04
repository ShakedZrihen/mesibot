"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importStar(require("express"));
const express_query_boolean_1 = __importDefault(require("express-query-boolean"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
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
const v1Router = (0, express_1.Router)();
v1Router.get('/health', async (req, res) => {
    return res.sendStatus(200);
});
exports.app.use('/v1', v1Router);
exports.default = exports.app;
//# sourceMappingURL=app.js.map