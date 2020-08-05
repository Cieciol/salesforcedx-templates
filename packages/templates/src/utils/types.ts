/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
export interface StringKeyValueObject<V> {
  [opt: string]: V;
}
export type OptionsMap = StringKeyValueObject<string>;
export type Answers = StringKeyValueObject<string>;
export interface CreateOutput {
  outputDir: string;
  created: string[];
  rawOutput: string;
}

/**
 * Available Template types
 */
export enum TemplateType {
  AnayticsTemplate,
  ApexClass,
  ApexTrigger,
  LightningApp,
  LightningComponent,
  LightningEvent,
  LightningInterface,
  LightningTest,
  Project,
  VisualforceComponent,
  VisualforcePage
}

/**
 * Template Options
 * If not supplied, the apiversion and outputdir use default values.
 */
export interface TemplateOptions {
  apiversion?: string;
  outputdir?: string;
}