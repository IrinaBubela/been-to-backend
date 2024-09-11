"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@heroku-cli/command");
const color_1 = require("@heroku-cli/color");
const core_1 = require("@oclif/core");
class Restart extends command_1.Command {
    async run() {
        const { args, flags } = await this.parse(Restart);
        const app = flags.app;
        const dyno = args.dyno;
        let msg = 'Restarting';
        if (dyno)
            msg += ` ${color_1.default.cyan(dyno)}`;
        msg += (dyno && dyno.includes('.')) ? ' dyno' : ' dynos';
        msg += ` on ${color_1.default.app(app)}`;
        core_1.ux.action.start(msg);
        await this.heroku.delete(dyno ? `/apps/${app}/dynos/${encodeURIComponent(dyno)}` : `/apps/${app}/dynos`);
        core_1.ux.action.stop();
    }
}
exports.default = Restart;
Restart.description = 'restart app dynos';
Restart.topic = 'ps';
Restart.aliases = ['dyno:restart'];
Restart.hiddenAliases = ['restart'];
Restart.examples = [
    '$ heroku ps:restart web.1',
    '$ heroku ps:restart web',
    '$ heroku ps:restart',
];
Restart.help = 'if DYNO is not specified, restarts all dynos on app';
Restart.args = {
    dyno: core_1.Args.string({ required: false }),
};
Restart.flags = {
    app: command_1.flags.app({ required: true }),
    remote: command_1.flags.remote(),
};
