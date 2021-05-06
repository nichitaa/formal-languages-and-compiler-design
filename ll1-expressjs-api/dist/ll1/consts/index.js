"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateType = exports.changeSymbols = exports.STACK_END = exports.EPSILON = exports.START_SYMBOL = void 0;
exports.START_SYMBOL = 'S';
exports.EPSILON = 'ε';
exports.STACK_END = '$';
const changeSymbols = (start, epsilon) => {
    exports.START_SYMBOL = start;
    exports.EPSILON = epsilon;
};
exports.changeSymbols = changeSymbols;
var stateType;
(function (stateType) {
    stateType[stateType["TERMINAL"] = 0] = "TERMINAL";
    stateType[stateType["NON_TERMINAL"] = 1] = "NON_TERMINAL";
})(stateType = exports.stateType || (exports.stateType = {}));
//# sourceMappingURL=index.js.map