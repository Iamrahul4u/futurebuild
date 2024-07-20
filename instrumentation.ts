// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import opentelemetry from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-grpc";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { alibabaCloudEcsDetector } from "@opentelemetry/resource-detector-alibaba-cloud";
import {
  awsEc2Detector,
  awsEksDetector,
} from "@opentelemetry/resource-detector-aws";
import { containerDetector } from "@opentelemetry/resource-detector-container";
import { gcpDetector } from "@opentelemetry/resource-detector-gcp";
import {
  envDetector,
  hostDetector,
  osDetector,
  processDetector,
} from "@opentelemetry/resources";

const sdk = new opentelemetry.NodeSDK({
  traceExporter: new OTLPTraceExporter(),
  instrumentations: [
    getNodeAutoInstrumentations({
      // disable fs instrumentation to reduce noise
      "@opentelemetry/instrumentation-fs": {
        enabled: false,
      },
    }),
  ],
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter(),
  }),
  resourceDetectors: [
    containerDetector,
    envDetector,
    hostDetector,
    osDetector,
    processDetector,
    alibabaCloudEcsDetector,
    awsEksDetector,
    awsEc2Detector,
    gcpDetector,
  ],
});

sdk.start();
