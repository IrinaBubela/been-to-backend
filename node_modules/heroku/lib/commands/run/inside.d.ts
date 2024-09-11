import { Command } from '@heroku-cli/command';
export default class RunInside extends Command {
    static description: string;
    static hidden: boolean;
    static examples: string[];
    static flags: {
        app: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        remote: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        'exit-code': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        listen: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    };
    static strict: boolean;
    run(): Promise<void>;
}
