"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsufficientFunds = void 0;
var AccountException = /** @class */ (function (_super) {
    __extends(AccountException, _super);
    function AccountException(msg) {
        return _super.call(this, msg) || this;
    }
    return AccountException;
}(Error));
var InsufficientFunds = /** @class */ (function (_super) {
    __extends(InsufficientFunds, _super);
    function InsufficientFunds(amount, balance, accountId) {
        return _super.call(this, "Insufficient Funds! Cannot withdraw " + amount + ". Balance: " + balance + " in account " + accountId + ".") || this;
    }
    return InsufficientFunds;
}(AccountException));
exports.InsufficientFunds = InsufficientFunds;
//# sourceMappingURL=AccountExceptions.js.map