import { getRecord } from "@/lib/atproto";
import { resolveHandle, resolveDid } from "@/lib/server/atproto";
import { getPds } from "@atproto/identity";

export default async function Page({
  params,
}: {
  params: {
    identifier: string;
    collection: string;
    rkey: string;
  };
}) {
  const decoded = decodeURIComponent(params.identifier);
  const did = await resolveHandle(decoded);
  if (!did) return <div>Invalid handle</div>;
  const doc = await resolveDid(did);
  if (!doc) return <div>Invalid handle</div>;
  const pds = getPds(doc);
  if (!pds) return <div>Missing PDS</div>;
  const record = await getRecord(did, pds, params.collection, params.rkey);
  return <pre>{JSON.stringify(record, null, 2)}</pre>;
}
