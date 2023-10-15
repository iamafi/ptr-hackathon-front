import axios from "axios";

import { env } from "@/env.mjs";

export const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

// add a slash to the end of the final url if it doesn't have one, take query params into account
apiClient.interceptors.request.use((config) => {
  if (!config.url) {
    return config;
  }

  console.log(config.url);

  let urlObj: URL;

  try {
    urlObj = new URL(config.url);
  } catch (e) {
    urlObj = new URL('/api' + config.url, apiClient.defaults.baseURL);
  }

  // Get the pathname and append a slash if necessary
  let pathname = urlObj.pathname;
  if (!pathname.endsWith("/")) {
    pathname += "/";
  }

  // Update the pathname and reconstruct the URL
  urlObj.pathname = pathname;
  config.url = urlObj.href;

  // Return the modified config
  return config;
});
