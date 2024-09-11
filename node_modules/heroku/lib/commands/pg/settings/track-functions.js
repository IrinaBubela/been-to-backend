"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const tsheredoc_1 = require("tsheredoc");
const setter_1 = require("../../../lib/pg/setter");
// ref: https://www.postgresql.org/docs/current/runtime-config-statistics.html#GUC-TRACK-FUNCTIONS
class TrackFunctions extends setter_1.PGSettingsCommand {
    constructor() {
        super(...arguments);
        this.settingKey = 'track_functions';
    }
    convertValue(val) {
        return val;
    }
    explain(setting) {
        return setting.values[setting.value];
    }
}
exports.default = TrackFunctions;
TrackFunctions.description = (0, tsheredoc_1.default)(`
    track_functions controls tracking of function call counts and time used. Default is none.
    Valid values for VALUE:
    none - No functions are tracked (default)
    pl   - Only procedural language functions are tracked
    all  - All functions, including SQL and C language functions, are tracked. Simple SQL-language that are inlined are not tracked`);
TrackFunctions.args = {
    database: core_1.Args.string(),
    value: core_1.Args.string({ options: ['none', 'pl', 'all'] }),
};
