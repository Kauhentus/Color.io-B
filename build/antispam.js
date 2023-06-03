"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Antispam = void 0;
const config_json_1 = __importDefault(require("./config.json"));
const highValueCommands = [
    'palette',
    'view',
];
const lowValueCommands = [
    'convert',
    'about',
    'help'
];
class Antispam {
    constructor() {
        this.userCooldowns = new Map();
    }
    // Returns true if user is spamming, false if not
    test(userID, command) {
        if (!this.userCooldowns.has(userID)) {
            this.reset(userID);
            return false;
        }
        const elapsedTime = new Date().getTime() - (this.userCooldowns.get(userID) || 0);
        if (highValueCommands.indexOf(command) != -1) {
            if (elapsedTime > config_json_1.default.millisHighValueCommand) {
                this.reset(userID);
                return false;
            }
            else {
                return true;
            }
        }
        else if (lowValueCommands.indexOf(command) != -1) {
            if (elapsedTime > config_json_1.default.millisLowValueCommand) {
                this.reset(userID);
            }
            else {
                return true;
            }
        }
        return false;
    }
    // Resets cooldown of user spam timer
    reset(userID) {
        this.userCooldowns.set(userID, new Date().getTime());
    }
}
exports.Antispam = Antispam;
