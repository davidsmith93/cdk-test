export enum Environment {
    DEV = "dev",
    QA = "qa",
    PROD = "prod"
}

export interface Config {
    ENVIRONMENT: Environment,
    LOG_LEVEL: string
}

const devConfig: Config = {
    ENVIRONMENT: Environment.DEV,
    LOG_LEVEL: "debug"
};

const qaConfig: Config = {
    ENVIRONMENT: Environment.QA,
    LOG_LEVEL: "info"
};

const prodConfig: Config = {
    ENVIRONMENT: Environment.PROD,
    LOG_LEVEL: "warn"
};

export function getConfig(account: String, region: String): Config {

    if(account === '140821111621' && region === 'us-west-2') {
        return devConfig;
    } else if (account === '140821111621' && region === 'eu-west-1') {
        return qaConfig;
    } else if(account === '124342901980' && region === 'eu-west-1') {
        return prodConfig;
    }

    throw Error(`Unable to find config for account: ${account} and region: ${region}`);
}
