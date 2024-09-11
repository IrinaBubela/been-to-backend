"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@heroku-cli/command");
const color_1 = require("@heroku-cli/color");
const core_1 = require("@oclif/core");
class Stop extends command_1.Command {
    async run() {
        const { args, flags } = await this.parse(Stop);
        const app = flags.app;
        const dyno = args.dyno;
        const type = dyno.includes('.') ? 'ps' : 'type';
        core_1.ux.action.start(`Stopping ${color_1.default.cyan(dyno)} ${type === 'ps' ? 'dyno' : 'dynos'} on ${color_1.default.app(app)}`);
        await this.heroku.post(`/apps/${app}/dynos/${dyno}/actions/stop`);
        core_1.ux.action.stop();
    }
}
exports.default = Stop;
Stop.description = 'stop app dyno';
Stop.topic = 'ps';
Stop.aliases = ['dyno:stop', 'ps:kill', 'dyno:kill'];
Stop.hiddenAliases = ['stop', 'kill'];
Stop.examples = [
    '$ heroku ps:stop run.1828',
    '$ heroku ps:stop run',
];
Stop.help = 'stop app dyno or dyno type';
Stop.args = {
    dyno: core_1.Args.string({ required: true }),
};
Stop.flags = {
    app: command_1.flags.app({ required: true }),
    remote: command_1.flags.remote(),
};
