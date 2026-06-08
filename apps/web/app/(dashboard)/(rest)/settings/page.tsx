import { EntityContainer, EntityHeader } from "@/components/entity-components";
import { requireAuth } from "@/lib/auth/auth-utils";
import { SettingsForm } from "@/components/dashboard/settings-form";

export default async function SettingsPage() {
  const { user } = await requireAuth();

  return (
    <EntityContainer
      header={
        <EntityHeader
          title="Settings"
          description="Manage your account settings and preferences."
        />
      }
    >
      <SettingsForm user={user} />
    </EntityContainer>
  );
}
