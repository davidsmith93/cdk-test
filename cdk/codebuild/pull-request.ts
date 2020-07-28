import * as codebuild from "@aws-cdk/aws-codebuild";
import * as cdk from "@aws-cdk/core";

export default class PullRequestCodeBuild extends codebuild.Project {
    constructor(scope: cdk.Construct) {
        super(scope, "taxi-audit-pull-request-build", {
            source: codebuild.Source.gitHub({
                owner: "rideways",
                repo: "cdk-test",
                webhook: true,
                webhookFilters: [
                    codebuild.FilterGroup.inEventOf(codebuild.EventAction.PUSH).andBranchIsNot("master"),
                ],
            }),
            buildSpec: codebuild.BuildSpec.fromSourceFilename("pull-request-spec.yml")
        });
    }
}
