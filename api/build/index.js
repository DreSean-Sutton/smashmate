"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = require('path');
const app = (0, express_1.default)();
const port = 3000;
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../my-app/build/index.html'));
});
console.log(__dirname);
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`express server listening on port ${port}`);
});
