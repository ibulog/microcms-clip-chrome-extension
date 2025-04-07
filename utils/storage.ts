import { storage } from "@wxt-dev/storage";

type Secrets = {
  serviceDomain: string;
  apiKey: string;
};

export const secrets = storage.defineItem<Secrets>("local:secrets", {
  fallback: {
    serviceDomain: "",
    apiKey: "",
  },
});
