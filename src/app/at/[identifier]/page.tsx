import { resolveDid, resolveHandle } from "@/lib/at";

export default async function Page({
  params,
}: {
  params: { identifier: string };
}) {
  const decoded = decodeURIComponent(params.identifier);
  const did = await resolveHandle(decoded);
  if (!did) return <div>Invalid handle</div>;
  const doc = await resolveDid(did);
  return (
    <div className="p-4">
      <div>handle: {decoded}</div>
      <div>
        did: <pre className="inline">{did}</pre>
      </div>
      <div>
        doc: <pre className="inline">{JSON.stringify(doc, null, 2)}</pre>
      </div>
    </div>
  );
}
