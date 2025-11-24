import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { loadPage, PageContent } from "../utils/content";

const Publications: React.FC = () => {
  const [page, setPage] = useState<PageContent | null>(null);

  useEffect(() => {
    (async () => {
      const loaded = await loadPage("publications");
      setPage(loaded);
    })();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{page?.title ?? "Publications"}</h1>
      {/* Google Doc embed renders via iframe */}
      {page?.source === "google-doc-embed" && page.googleDocId ? (
        <div className="aspect-video w-full">
          <iframe
            title="Publications"
            src={`https://docs.google.com/document/d/${page.googleDocId}/preview`}
            className="w-full h-full border-0"
            allow="clipboard-write"
          />
        </div>
      ) : (
        <div className="prose max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{page?.body ?? "Browse selected publications below."}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default Publications;