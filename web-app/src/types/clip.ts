import { MicroCMSListContent } from "microcms-js-sdk";

export type Clip = MicroCMSListContent & {
  title: string;
  url: string;
  category?: {
    id: string;
    name: string;
  };
  comment?: string;
};
