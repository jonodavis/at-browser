import { CodeBlock } from "@/components/CodeBlock";
import { getRecord } from "@/lib/atproto";
import { getIdentity } from "@/lib/server/atproto";
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
  const { didDocument } = await getIdentity(params.identifier);
  const pds = getPds(didDocument);
  if (!pds) return <div>Missing PDS</div>;
  const record = await getRecord(
    didDocument.id,
    pds,
    params.collection,
    params.rkey,
  );
  return <CodeBlock code={JSON.stringify(record, null, 2)} language="json" />;
}
