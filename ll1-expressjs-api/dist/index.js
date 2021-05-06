"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const parserRouter_1 = __importDefault(require("./routes/parserRouter"));
const app = express_1.default();
const port = 8080;
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(cors_1.default());
app.use('/api', parserRouter_1.default);
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map