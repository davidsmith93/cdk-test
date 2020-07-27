import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as logs from '@aws-cdk/aws-logs';
import * as codebuild from '@aws-cdk/aws-codebuild';
import * as path from 'path';
import {Config, Environment, getConfig} from './config';

export class Stack extends cdk.Stack {

    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const config: Config = getConfig(this.account, this.region);

        new lambda.Function(this, 'taxi-audit-create-handler', {
            functionName: 'AuditCreateHandler',
            runtime: lambda.Runtime.NODEJS_12_X,
            handler: 'create_audit.createAuditHandler',
            code: lambda.Code.fromAsset(path.join('src', 'handler')),
            tracing: lambda.Tracing.ACTIVE,
            logRetention: logs.RetentionDays.ONE_MONTH,
            environment: {
                LOG_LEVEL: config.LOG_LEVEL
            }
        });

        if(config.ENVIRONMENT === Environment.DEV) {
            new codebuild.Project(this, 'taxi-audit-pull-request-build', {
                source: codebuild.Source.gitHub({
                    owner: 'rideways',
                    repo: 'cdk-test',
                    webhook: true,
                    webhookFilters: [
                        codebuild.FilterGroup.inEventOf(codebuild.EventAction.PUSH).andBranchIsNot('master'),
                    ],
                }),
                buildSpec: codebuild.BuildSpec.fromSourceFilename("pull-request-spec.yml")
            });
        }

    }

}
