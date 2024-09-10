import { getCollections } from "@/lib/atproto";
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

  return (
    <div className="space-y-4">
      <div>handle: {handle}</div>
      <div>
        did: <pre className="inline">{didDocument.id}</pre>
      </div>
      <div>
        doc:{" "}
        <pre className="inline">{JSON.stringify(didDocument, null, 2)}</pre>
      </div>
      <div>
        collections:{" "}
        {collections.map((nsid) => (
          <Link
            href={`/at/${params.identifier}/${nsid}`}
            key={nsid}
            className="block underline"
          >
            {nsid}
          </Link>
        ))}
      </div>
    </div>
  );
}
