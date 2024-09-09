import { getRecords } from "@/lib/atproto";
import { resolveHandle, resolveDid } from "@/lib/server/atproto";
import { Records } from "@/components/Records";
import { getPds } from "@atproto/identity";

export default async function Page({
  params,
}: {
  params: { identifier: string; collection: string };
}) {
  const decoded = decodeURIComponent(params.identifier);
  const did = await resolveHandle(decoded);
  if (!did) return <div>Invalid handle</div>;
  const doc = await resolveDid(did);
  if (!doc) return <div>Invalid handle</div>;
  const pds = getPds(doc);
  if (!pds) return <div>Missing PDS</div>;

  const initialRecords = await getRecords(did, pds, params.collection);

  return (
    <div>
      {JSON.stringify(params)}
      <Records
        initialData={initialRecords}
        collection={params.collection}
        did={did}
        pds={pds}
      />
    </div>
  );
}
