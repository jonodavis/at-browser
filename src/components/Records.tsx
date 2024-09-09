"use client";

import { getRecords, type GetRecordsResponse } from "@/lib/atproto";
import { AtUri } from "@atproto/syntax";
import { useInfiniteQuery } from "@tanstack/react-query";

export function Records(props: {
  initialData: GetRecordsResponse;
  did: string;
  pds: string;
  collection: string;
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
      <pre>
        {data.pages.map((page) =>
          page.records.map((record) => {
            const atUri = new AtUri(record.uri);
            return <div key={record.uri}>{atUri.rkey}</div>;
          }),
        )}
      </pre>
      {hasNextPage && (
        <button className="border" onClick={() => fetchNextPage()}>
          load more
        </button>
      )}
    </div>
  );
}
