"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var admin = require("firebase-admin");
var node_fetch_1 = require("node-fetch");
var btoa = require("btoa");
var crypto = require('crypto');
var sha256 = crypto.createHash("sha256");
var ref;
//
// Util
//
function hasScreen(conv) {
    return conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
}
exports.hasScreen = hasScreen;
var _creds;
function fetchWithCreds(url, creds, dontsave) {
    if (dontsave === void 0) { dontsave = false; }
    if (creds && !dontsave)
        _creds = creds;
    return node_fetch_1.default(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1",
            "Authorization": "Basic " + btoa(_creds.u + ":" + _creds.p)
        }
    });
}
exports.fetchWithCreds = fetchWithCreds;
function cleanCreds() {
    _creds = undefined;
}
exports.cleanCreds = cleanCreds;
function generateHashedCreds(creds) {
    return sha256.update(JSON.stringify({
        u: creds.u,
        p: creds.p
    })).digest("base64");
}
exports.generateHashedCreds = generateHashedCreds;
var Stundenplan = /** @class */ (function () {
    function Stundenplan() {
    }
    return Stundenplan;
}());
exports.Stundenplan = Stundenplan;
var StundenplanDBResult = /** @class */ (function () {
    function StundenplanDBResult() {
    }
    return StundenplanDBResult;
}());
exports.StundenplanDBResult = StundenplanDBResult;
//
// DB Functions
//
function getUserFromDB(sub) {
    return __awaiter(this, void 0, void 0, function () {
        var snap;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!ref)
                        ref = admin.database().ref("actions");
                    return [4 /*yield*/, ref.child(sub).once("value")];
                case 1:
                    snap = _a.sent();
                    return [2 /*return*/, snap.val()];
            }
        });
    });
}
exports.getUserFromDB = getUserFromDB;
function getStundenplanFromDB(stufeid, usrCreds) {
    return __awaiter(this, void 0, void 0, function () {
        var spRef, snap, val, now;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!ref)
                        ref = admin.database().ref("actions");
                    spRef = ref.child("sp").child(stufeid.toString());
                    return [4 /*yield*/, spRef.once("value")];
                case 1:
                    snap = _a.sent();
                    val = snap.val();
                    if (val === null)
                        return [2 /*return*/, null];
                    now = +(new Date());
                    if (now > val.ttl)
                        return [2 /*return*/, null];
                    if (generateHashedCreds(usrCreds) !== val.credsHash)
                        return [2 /*return*/, null];
                    return [2 /*return*/, { plan: val.plan, availKurse: val.availKurse }];
            }
        });
    });
}
exports.getStundenplanFromDB = getStundenplanFromDB;
function pushSPtoDB(plan, availKurse, creds, stufeid) {
    return __awaiter(this, void 0, void 0, function () {
        var sendPayload, spRef;
        return __generator(this, function (_a) {
            sendPayload = {
                availKurse: availKurse,
                plan: plan,
                credsHash: generateHashedCreds(creds),
                ttl: new Date().setDate(new Date().getDate() + 7)
            };
            if (!ref)
                ref = admin.database().ref("actions");
            spRef = ref.child("sp").child(stufeid.toString());
            return [2 /*return*/, spRef.set(sendPayload)];
        });
    });
}
exports.pushSPtoDB = pushSPtoDB;
