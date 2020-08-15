"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoltLogger = void 0;
const debug_1 = __importDefault(require("debug"));
class BoltLogger {
    constructor(instance, inheritedData) {
        this.instance = instance;
        this.inheritedData = inheritedData;
        this.logger = {};
    }
    static createLogger() {
        return new BoltLogger(debug_1.default('root'));
    }
    rawerror(obj, record) {
        var _a;
        this.error(Object.assign({ err: obj.message, stack: (_a = obj.stack) !== null && _a !== void 0 ? _a : '' }, (record !== null && record !== void 0 ? record : {})));
    }
    log(record) {
        var _a;
        if (!this.instance.enabled)
            return; // Don't execute any JSON stringify operation if logging is not enabled for this tag
        if (this.inheritedData) {
            this.instance(JSON.stringify(Object.assign(Object.assign({}, ((_a = this.inheritedData) !== null && _a !== void 0 ? _a : {})), record)));
        }
        else {
            this.instance(JSON.stringify(record));
        }
    }
    logSub(subNamespace, record) {
        if (!this.logger[subNamespace]) {
            this.logger[subNamespace] = this.extend(subNamespace);
        }
        this.logger[subNamespace].log(record);
    }
    error(record) {
        if (!this.instance.enabled)
            return;
        this.logSub('error', record);
    }
    panic(record) {
        if (!this.instance.enabled)
            return;
        this.logSub('panic', record);
    }
    warning(record) {
        if (!this.instance.enabled)
            return;
        this.logSub('warning', record);
    }
    timing(record) {
        if (!this.instance.enabled)
            return;
        this.logSub('timing', record);
    }
    verbose(record) {
        if (!this.instance.enabled)
            return; // Don't execute any JSON stringify operation if logging is not enabled for this tag
        this.logSub('verbose', record);
    }
    extend(namespace, appendData) {
        var _a;
        return new BoltLogger(this.instance.extend(namespace), Object.assign(Object.assign({}, ((_a = this.inheritedData) !== null && _a !== void 0 ? _a : {})), (appendData !== null && appendData !== void 0 ? appendData : {})));
    }
    _debug() {
        return this.instance;
    }
}
exports.BoltLogger = BoltLogger;
exports.default = BoltLogger;
