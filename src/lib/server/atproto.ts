import "server-only";

import { IdResolver, getHandle } from "@atproto/identity";
import { isValidHandle } from "@atproto/syntax";
import { isDid } from "@atproto/did";

const idResolver = new IdResolver({});

async function resolveHandle(handle: string) {
  const did = await idResolver.handle.resolve(handle);
  return did;
}

async function resolveDid(did: string) {
  const doc = await idResolver.did.resolve(did);
  return doc;
}

export async function getIdentity(identifier: string) {
  const decoded = decodeURIComponent(identifier);
  if (isValidHandle(decoded)) {
    const did = await resolveHandle(decoded);
    if (!did) throw new Error("Failed to resolve DID from handle");
    const doc = await resolveDid(did);
    if (!doc) throw new Error(`Failed to fetch didDocument for DID: ${did}`);
    return { handle: decoded, didDocument: doc };
  }
  if (!isDid(decoded)) throw new Error(`Invalid identifier: ${identifier}`);
  const doc = await resolveDid(decoded);
  if (!doc) throw new Error(`Failed to fetch didDocument for DID: ${decoded}`);
  return { handle: getHandle(doc), didDocument: doc };
}
