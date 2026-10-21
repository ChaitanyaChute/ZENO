import prisma from "@repo/database/client";
import Cryptr from "cryptr";

export async function getDecryptedCredential(
  userId: string,
  credentialId?: string | null,
): Promise<string | null> {
  if (!credentialId) return null;

  try {
    const cred = await prisma.credential.findFirst({
      where: { id: credentialId, userId },
    });
    if (!cred || !cred.value) return null;

    const key = process.env.ENCRYPTION_KEY || "default_encryption_key_for_development_only";
    try {
      const cryptr = new Cryptr(key);
      return cryptr.decrypt(cred.value);
    } catch {
      // Return raw value if not encrypted
      return cred.value;
    }
  } catch (error) {
    console.error(`[getDecryptedCredential] Error reading credential ${credentialId}:`, error);
    return null;
  }
}
