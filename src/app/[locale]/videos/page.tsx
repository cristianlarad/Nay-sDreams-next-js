// components/videos/VideoList.tsx

import { getTranslations } from "next-intl/server";

import VideoPlayer from "@/components/video/VideoPlayer";
import { pb } from "@/lib/pocketbase";
import { Video } from "@/types/video";

export default async function VideoList() {
  const t = await getTranslations("Video");

  const videos = await pb.collection<Video>("videos").getFullList();
  console.log(videos);
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-12 text-pink-700">
        {t("title")}
      </h1>
      <p className="text-center text-gray-600 mb-12">{t("description")}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <VideoPlayer
              url={`https://nays-dream.pockethost.io/api/files/${video.collectionId}/${video.id}/${video.video}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
