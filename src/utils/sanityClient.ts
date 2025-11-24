import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined;
const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) || "production";
const apiVersion = (import.meta.env.VITE_SANITY_API_VERSION as string | undefined) || "2023-01-01";

export const sanity = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;