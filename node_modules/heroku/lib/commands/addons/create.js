"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const color_1 = require("@heroku-cli/color");
const command_1 = require("@heroku-cli/command");
const core_1 = require("@oclif/core");
const notify_1 = require("../../lib/notify");
const create_addon_1 = require("../../lib/addons/create_addon");
const tsheredoc_1 = require("tsheredoc");
function parseConfig(args) {
    const config = {};
    while (args.length > 0) {
        let key = args.shift();
        if (!key.startsWith('--'))
            throw new Error(`Unexpected argument ${key}`);
        key = key.replace(/^--/, '');
        let val;
        if (key.includes('=')) {
            [key, ...val] = key.split('=');
            val = val.join('=');
            if (val === 'true') {
                val = true;
            }
            config[key] = val;
        }
        else {
            val = args.shift();
            if (!val) {
                config[key] = true;
            }
            else if (val.startsWith('--')) {
                config[key] = true;
                args.unshift(val);
            }
            else {
                config[key] = val;
            }
        }
    }
    return config;
}
class Create extends command_1.Command {
    async run() {
        var _a;
        const _b = await this.parse(Create), { flags, args } = _b, restParse = tslib_1.__rest(_b, ["flags", "args"]);
        const { app, name, as, wait, confirm } = flags;
        const servicePlan = args['service:plan'];
        const argv = restParse.argv
            // oclif duplicates specified args in argv
            .filter(arg => arg !== servicePlan);
        const config = parseConfig(argv);
        let addon;
        try {
            addon = await (0, create_addon_1.default)(this.heroku, app, servicePlan, confirm, wait, { config, name, as });
            if (wait) {
                (0, notify_1.default)(`heroku addons:create ${addon.name}`, 'Add-on successfully provisioned');
            }
        }
        catch (error) {
            if (wait) {
                (0, notify_1.default)(`heroku addons:create ${servicePlan}`, 'Add-on failed to provision', false);
            }
            throw error;
        }
        await this.config.runHook('recache', { type: 'addon', app, addon });
        // eslint-disable-next-line no-unsafe-optional-chaining
        core_1.ux.log(`Use ${color_1.default.cyan.bold('heroku addons:docs ' + ((_a = addon === null || addon === void 0 ? void 0 : addon.addon_service) === null || _a === void 0 ? void 0 : _a.name) || '')} to view documentation`);
    }
}
exports.default = Create;
Create.topic = 'addons';
Create.description = (0, tsheredoc_1.default) `
  Create a new add-on resource.

  In order to add additional config items, please place them at the end of the command after a double-dash (--).
  `;
Create.example = (0, tsheredoc_1.default) `
  Create an add-on resource:
  $heroku addons:create heroku-redis --app my-app

  Create an add-on resource with additional config items:
  $heroku addons:create heroku-postgresql:standard-0 --app my-app -- --fork DATABASE
  `;
Create.strict = false;
Create.hiddenAliases = ['addons:add'];
Create.flags = {
    name: command_1.flags.string({ description: 'name for the add-on resource' }),
    as: command_1.flags.string({ description: 'name for the initial add-on attachment' }),
    confirm: command_1.flags.string({ description: 'overwrite existing config vars or existing add-on attachments' }),
    wait: command_1.flags.boolean({ description: 'watch add-on creation status and exit when complete' }),
    app: command_1.flags.app({ required: true }),
    remote: command_1.flags.remote(),
};
Create.args = {
    'service:plan': core_1.Args.string({ required: true }),
};
