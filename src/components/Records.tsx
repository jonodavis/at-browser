"use client";

import { getRecords, type GetRecordsResponse } from "@/lib/atproto";
import { AtUri } from "@atproto/syntax";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";

export function Records(props: {
  initialData: GetRecordsResponse;
  did: string;
  pds: string;
  collection: string;
  handle?: string;
}) {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["records", props.collection, props.did],
    queryFn: ({ pageParam }) =>
      getRecords(props.did, props.pds, props.collection, pageParam),
    getNextPageParam: (lastPage) => lastPage.cursor,
    initialPageParam: undefined,
    initialData: {
      pages: [props.initialData],
      pageParams: [""],
    },
  });

  return (
    <div>
      {data.pages.map((page) =>
        page.records.map((record) => {
          const atUri = new AtUri(record.uri);
          return (
            <Link
              href={`/at/${props.handle ?? props.did}/${props.collection}/${atUri.rkey}`}
              key={record.uri}
              className="block w-fit font-mono underline"
            >
              {atUri.rkey}
            </Link>
          );
        }),
      )}
      {hasNextPage && (
        <button className="border" onClick={() => fetchNextPage()}>
          load more
        </button>
      )}
    </div>
  );
}
