import { Command } from '@heroku-cli/command';
export default class Stop extends Command {
    static description: string;
    static topic: string;
    static aliases: string[];
    static hiddenAliases: string[];
    static examples: string[];
    static help: string;
    static args: {
        dyno: import("@oclif/core/lib/interfaces/parser").Arg<string, Record<string, unknown>>;
    };
    static flags: {
        app: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        remote: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
    };
    run(): Promise<void>;
}
