import { FaPlusSquare } from "react-icons/fa";
import { YouTubeEmbed } from '@next/third-parties/google';

export default function VideoGallery({ videos }) {
    return (
      <div className="my-8">
        <label className="block mb-2 font-bold text-gray-700">Videos</label>
        <div className="dashboard-gallery grid grid-cols-[repeat(auto-fill,minmax(200px,2fr))] gap-4">
          {videos.map((vid, i) => (
            <YouTubeEmbed videoid={vid} key={i}  className="shadow-md"/>
          ))}
          <div className="relative border flex justify-center items-center 
            bg-center rounded-lg overflow-hidden shadow-md hover:shadow-xl">
              <div
                className="h-40 w-full rounded-lg cursor-pointer flex justify-center items-center"
              >
                <FaPlusSquare size={100} className="opacity-30"/>
              </div>
            </div>
        </div>
      </div>
    );
  }