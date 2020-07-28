import * as path from "path";
import * as lambda from '@aws-cdk/aws-lambda';
import * as logs from '@aws-cdk/aws-logs';
import * as cdk from "@aws-cdk/core";
import {Config} from "../config";

export default class CreateAuditLambda extends lambda.Function {
    constructor(scope: cdk.Construct, config: Config) {
        super(scope, 'taxi-audit-create-handler', {
            functionName: 'AuditCreateHandler',
            runtime: lambda.Runtime.NODEJS_12_X,
            handler: 'create_audit.createAuditHandler',
            code: lambda.Code.fromAsset(path.join('src', 'handler')),
            tracing: lambda.Tracing.ACTIVE,
            logRetention: logs.RetentionDays.ONE_MONTH,
            environment: {
                LOG_LEVEL: config.log_level
            }
        });
    }
}
