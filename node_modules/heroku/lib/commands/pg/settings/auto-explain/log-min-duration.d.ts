import { PGSettingsCommand } from '../../../../lib/pg/setter';
import { Setting, SettingKey } from '../../../../lib/pg/types';
export default class LogMinDuration extends PGSettingsCommand {
    static topic: string;
    static description: string;
    static args: {
        database: import("@oclif/core/lib/interfaces/parser").Arg<string | undefined, Record<string, unknown>>;
        value: import("@oclif/core/lib/interfaces/parser").Arg<number | undefined, {
            min?: number | undefined;
            max?: number | undefined;
        }>;
    };
    protected settingKey: SettingKey;
    protected convertValue(val: string): number;
    protected explain(setting: Setting<number>): string;
}
