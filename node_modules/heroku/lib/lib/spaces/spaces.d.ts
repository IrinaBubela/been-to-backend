import * as Heroku from '@heroku-cli/schema';
export declare function displayShieldState(space: Heroku.Space): "on" | "off";
export declare function displayNat(nat?: Required<Heroku.SpaceNetworkAddressTranslation>): string | undefined;
export declare function renderInfo(space: Heroku.Space, json: boolean): void;
