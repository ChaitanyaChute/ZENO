import type { WorkflowTemplate } from "./types";

export interface CredentialBinding {
  bindingKey: string;
  platform: string;
  credentialId: string;
}

/**
 * Generates a stable, unique key for a required binding within a template.
 * When multiple bindings share the same platform, the index disambiguates them.
 */
export function getTemplateBindingKey(
  binding: WorkflowTemplate["requiredBindings"][number],
  index: number
): string {
  return `${binding.platform}::${index}`;
}
