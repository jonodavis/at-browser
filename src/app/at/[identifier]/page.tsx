import { getCollections } from "@/lib/atproto";
import { resolveHandle, resolveDid } from "@/lib/server/atproto";
import { getPds } from "@atproto/identity";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { identifier: string };
}) {
  const decoded = decodeURIComponent(params.identifier);
  const did = await resolveHandle(decoded);
  if (!did) return <div>Invalid handle</div>;
  const doc = await resolveDid(did);
  if (!doc) return <div>Invalid handle</div>;
  const pds = getPds(doc);
  if (!pds) return <div>Missing PDS</div>;

  const collections = await getCollections(did, pds);

  return (
    <div className="space-y-4">
      <div>handle: {decoded}</div>
      <div>
        did: <pre className="inline">{did}</pre>
      </div>
      <div>
        doc: <pre className="inline">{JSON.stringify(doc, null, 2)}</pre>
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
