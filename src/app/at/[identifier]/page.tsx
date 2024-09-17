import { CodeBlock } from "@/components/CodeBlock";
import { getAuditLog, getCollections } from "@/lib/atproto";
import { getIdentity } from "@/lib/server/atproto";
import { getPds } from "@atproto/identity";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { identifier: string };
}) {
  const { didDocument, handle } = await getIdentity(params.identifier);
  const pds = getPds(didDocument);
  if (!pds) return <div>Missing PDS</div>;

  const collections = await getCollections(didDocument.id, pds);
  const auditLog = await getAuditLog(didDocument.id);

  return (
    <div className="space-y-4">
      <div>handle: {handle}</div>
      <div>
        DID: <pre className="inline">{didDocument.id}</pre>
      </div>
      <div>
        DID Document:
        <CodeBlock
          code={JSON.stringify(didDocument, null, 2)}
          language="json"
        />
      </div>
      <div>
        collections:{" "}
        {collections.map((nsid) => (
          <Link
            href={`/at/${handle}/${nsid}`}
            key={nsid}
            className="block w-fit underline"
          >
            {nsid}
          </Link>
        ))}
      </div>
      <div>
        Audit Log:
        <CodeBlock code={JSON.stringify(auditLog, null, 2)} language="json" />
      </div>
    </div>
  );
}
