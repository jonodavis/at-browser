"use client";
import { usePathname } from "next/navigation";
import {
  BreadcrumbItem,
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Fragment } from "react";

/**
 * Generates all possible paths from a given path string.
 * @param input - The input path string, e.g., `/at/danabra.mov/app.bsky.feed.post/3l3tjecnrfi2z`
 * @returns An array of possible paths.
 */
function generatePaths(input: string): string[] {
  // Remove leading slash and split the path into segments
  const segments = input.startsWith("/")
    ? input.slice(1).split("/")
    : input.split("/");
  // Generate all possible paths by reducing segments incrementally
  return segments
    .map((_, index) => segments.slice(0, index + 1).join("/"))
    .map((path) => `/${path}`);
}

export function PathBreadcrumb() {
  const pathname = usePathname();
  const paths = generatePaths(pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => {
          if (index === 0) return;
          return (
            <Fragment key={path}>
              <BreadcrumbItem>
                <BreadcrumbLink href={path}>
                  {path.split("/").pop()}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < paths.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
