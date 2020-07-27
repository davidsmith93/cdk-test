import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Stack } from './stack';

const app = new cdk.App();

const tags = {
    Application: 'Taxi Auditing',
    OwningTeam: 'TENG06',
    ProjectCode: 'TAXIPRJ010'
};

new Stack(app, 'TaxiAuditing', { tags });
