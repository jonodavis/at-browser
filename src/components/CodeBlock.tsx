import { codeToHtml, type BundledLanguage } from "shiki";

export async function CodeBlock(props: {
  code: string;
  language: BundledLanguage;
}) {
  const html = await codeToHtml(props.code, {
    lang: props.language,
    theme: "github-light",
    colorReplacements: {
      "#fff": "#f8fafc", // slate-50
    },
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className="max-w-full overflow-x-auto rounded-2xl bg-slate-50 p-4"
    />
  );
}
