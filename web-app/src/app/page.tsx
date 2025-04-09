import React from "react";
import { client } from "../lib/microcms";
import { Clip } from "../types/clip";

export const dynamic = "force-dynamic";

async function getClips() {
  const clips = await client.getList<Clip>({
    endpoint: "clips",
  });
  return clips;
}

export default async function Home() {
  const { contents: clips } = await getClips();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">クリップ一覧</h1>
      <div className="space-y-4">
        {clips.map((clip) => (
          <div className="flex-grow" key={clip.id}>
            <div className="flex items-center gap-2">
              <p className="text-gray-600 text-sm">
                {new Date(clip.createdAt).toLocaleDateString()}
              </p>
              {clip.category && (
                <p className="text-gray-600 text-sm">{clip.category.name}</p>
              )}
            </div>
            <h2 className="text-xl font-semibold mb-2">
              <a
                href={clip.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 hover:underline"
              >
                {clip.title}
              </a>
            </h2>
            {clip.comment && (
              <p className="text-gray-700 mt-2">{clip.comment}</p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
