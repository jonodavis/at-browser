import "server-only";
import { IdResolver } from "@atproto/identity";

const idResolver = new IdResolver({});

export async function resolveHandle(handle: string) {
  const did = await idResolver.handle.resolve(handle);
  return did;
}

export async function resolveDid(did: string) {
  const doc = await idResolver.did.resolve(did);
  return doc;
}
