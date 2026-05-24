//keyGitGaurd.js
// on smiliar lines from utils/virtualAccountCrypto.ts

const SECRET_KEY = "OneDinaar-Virtual-Account-2026";

/**
 * Convert string to ArrayBuffer
 */
const strToBuffer = (str ) =>
  new TextEncoder().encode(str);

/**
 * Convert ArrayBuffer to string
 */
const bufferToStr = (buffer ) =>
  new TextDecoder().decode(buffer);

/**
 * Generate AES Key
 */
async function getKey() {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    strToBuffer(SECRET_KEY),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: strToBuffer("onedinaar-salt"),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    {
      name: "AES-GCM",
      length: 256,
    },
    false,
    ["encrypt", "decrypt"]
  );
}

/**
 * Encrypt text
 
export async function encryptText(text: string): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const key = await getKey();

  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    strToBuffer(text)
  );

  const encryptedArray = new Uint8Array(encrypted);

  const merged = new Uint8Array(iv.length + encryptedArray.length);

  merged.set(iv);
  merged.set(encryptedArray, iv.length);

  return btoa(String.fromCharCode(...merged));
   // above statement gives a error like 
   // Type 'Uint8Array<ArrayBuffer>' can only be iterated through when using the '--downlevelIteration' flag or with a '--target' of 'es2015' or higher.ts(2802
   // const merged: Uint8Array<ArrayBuffer>

}
*/
export async function encryptText(text )  {
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const key = await getKey();

  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    strToBuffer(text)
  );

  const encryptedArray = new Uint8Array(encrypted);

  const merged = new Uint8Array(
    iv.length + encryptedArray.length
  );

  merged.set(iv);

  merged.set(encryptedArray, iv.length);

  // ES5 SAFE VERSION
  let binary = "";

  merged.forEach((b) => {
    binary += String.fromCharCode(b);
  });

  return btoa(binary);
}



/**
 * Decrypt text
 */
export async function decryptText(
  encryptedText 
) {
  const merged = Uint8Array.from(
    atob(encryptedText),
    (c) => c.charCodeAt(0)
  );

  const iv = merged.slice(0, 12);

  const data = merged.slice(12);

  const key = await getKey();

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    data
  );

  return bufferToStr(decrypted);
}
