//virtualAccountStorage.ts
// utils/virtualAccountStorage.ts

import {
  encryptText,
  decryptText,
} from "./virtualAccountCrypto";

export interface VirtualCredentials {
  vId: string;
  vPass: string;
  salt: string;
}

/**
 * Save encrypted credentials
 */
export async function saveVirtualCredentials(
  credentials: VirtualCredentials
) {
  const encrypted = {
    vId: credentials.vId,

    vPass: await encryptText(credentials.vPass),

    salt: await encryptText(credentials.salt),
  };

  localStorage.setItem(
    "virtualAccountCredentials",
    JSON.stringify(encrypted)
  );
}

/**
 * Load + decrypt credentials
 */
export async function loadVirtualCredentials(): Promise<VirtualCredentials | null> {
  const raw = localStorage.getItem(
    "virtualAccountCredentials"
  );

  if (!raw) return null;

  const parsed = JSON.parse(raw);

  return {
    vId: parsed.vId,

    vPass: await decryptText(parsed.vPass),

    salt: await decryptText(parsed.salt),
  };
}

/**
 * Remove credentials
 */
export function clearVirtualCredentials() {
  localStorage.removeItem(
    "virtualAccountCredentials"
  );
}
