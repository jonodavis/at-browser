import { z } from "zod";

const describeRepoSchema = z.object({ collections: z.string().array() });

export async function getCollections(did: string, pds: string) {
  if (!pds) throw new Error("PDS is undefined");
  const url = new URL(`${pds}/xrpc/com.atproto.repo.describeRepo`);
  url.searchParams.set("repo", did);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to get collections: ${res.statusText}`);
  const json = await res.json();
  const { collections } = describeRepoSchema.parse(json);
  return collections;
}

const listRecordsSchema = z.object({
  records: z.array(
    z.object({
      uri: z.string(),
      cid: z.string(),
    }),
  ),
  cursor: z.string().optional(),
});

export type GetRecordsResponse = z.infer<typeof listRecordsSchema>;

export async function getRecords(
  did: string,
  pds: string,
  collection: string,
  cursor?: string,
) {
  const listRecordsUrl = new URL(`${pds}/xrpc/com.atproto.repo.listRecords`);
  listRecordsUrl.searchParams.set("repo", did);
  listRecordsUrl.searchParams.set("collection", collection);
  if (cursor) listRecordsUrl.searchParams.set("cursor", cursor);
  const res = await fetch(listRecordsUrl, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to list records: ${res.statusText}`);
  return listRecordsSchema.parse(await res.json());
}

export async function getRecord(
  did: string,
  pds: string,
  collection: string,
  rkey: string,
) {
  const getRecordUrl = new URL(`${pds}/xrpc/com.atproto.repo.getRecord`);
  getRecordUrl.searchParams.set("repo", did);
  getRecordUrl.searchParams.set("collection", collection);
  getRecordUrl.searchParams.set("rkey", rkey);
  const res = await fetch(getRecordUrl, { next: { revalidate: 60 * 10 } });
  if (!res.ok) throw new Error(`Failed ot get record: ${res.statusText}`);
  const json = await res.json();
  return json;
}

export async function getAuditLog(did: string) {
  const res = await fetch(`https://plc.directory/${did}/log/audit`);
  if (!res.ok) throw new Error(`Failed to fetch audit log for DID: ${did}`);
  const json = await res.json();
  return json;
}
