import * as cdk from "@aws-cdk/core";

export interface Config {
    environment: string,
    log_level: string
}

export function getConfig(stack: cdk.Stack): Config {
    const environmentDetails = stack.node.tryGetContext("aws_env_details");

    if(environmentDetails[stack.account] && environmentDetails[stack.account][stack.region]) {
        return environmentDetails[stack.account][stack.region];
    }

    return {
        environment: "dev",
        log_level: "debug"
    }
}
