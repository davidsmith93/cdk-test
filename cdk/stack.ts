import * as cdk from '@aws-cdk/core';
import {Config, getConfig} from "./config";
import CreateAuditLambda from "./lambda/create_audit";
import PullRequestCodeBuild from "./codebuild/pull-request";

export class Stack extends cdk.Stack {

    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const config: Config = getConfig(this);
        new CreateAuditLambda(this, config);

        if(config.environment === "dev") {
            new PullRequestCodeBuild(this);
        }
    }
}
