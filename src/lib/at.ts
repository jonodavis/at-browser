import { DidResolver, HandleResolver } from "@atproto/identity";

const handleResolver = new HandleResolver({});
const didResolver = new DidResolver({});

export async function resolveHandle(handle: string) {
  const did = await handleResolver.resolve(handle);
  return did;
}

export async function resolveDid(did: string) {
  const doc = await didResolver.resolve(did);
  return doc;
}
