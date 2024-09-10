import { getRecords } from "@/lib/atproto";
import { getIdentity } from "@/lib/server/atproto";
import { Records } from "@/components/Records";
import { getPds } from "@atproto/identity";

export default async function Page({
  params,
}: {
  params: { identifier: string; collection: string };
}) {
  const { didDocument, handle } = await getIdentity(params.identifier);
  const pds = getPds(didDocument);
  if (!pds) return <div>Missing PDS</div>;

  const initialRecords = await getRecords(
    didDocument.id,
    pds,
    params.collection,
  );

  return (
    <div>
      <Records
        initialData={initialRecords}
        collection={params.collection}
        did={didDocument.id}
        pds={pds}
        handle={handle}
      />
    </div>
  );
}
