import {
  createClient as baseCreateClient,
  type ClientConfig,
  type Route,
} from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import sm from "./slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || sm.repositoryName;

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
// TODO: Update the routes array to match your project's route structure.
const routes: Route[] = [
  // Examples:
   { type: "homepage", path: "/" },
   { type: "about", path: "/about" },
   { type: "blogs", path: "/blogs"},
   { type: "blog_post", path: "/blogs/:[uid]" },
   { type: "contact", path: "/contact" },
   { type: "legal", path: "/legal" },
   { type: "packages", path: "/packages" },
   { type: "package", path: "/package/:[uid]" },
   { type: "policy", path: "/policy/:[uid]" },
   { type: "services", path: "/services" },
   { type: "service", path: "/service/:[uid]" },
   
   

];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: ClientConfig = {}) => {
  const client = baseCreateClient(repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
    ...config,
  });

  enableAutoPreviews({ client });

  return client;
};
