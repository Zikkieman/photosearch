import Image from "next/image";
import { DataType } from "@/libs/types";

function CityCard({ item }: { item: DataType }) {
  return (
    <div
      key={item?.id}
      className="flex w-full flex-col items-center border border-gray-200 overflow-hidden rounded-lg bg-zinc-100 shadow-sm font-arial"
    >
      <div className="relative w-full h-52">
        <div className="absolute z-10 bg-white py-1 px-2 rounded-2xl right-[10px] top-[10px]">
          <p className="text-[11px]">❤️ {item?.likes}</p>
        </div>
        <Image
          src={item?.urls?.regular}
          alt={item?.alt_description}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <div className="p-5 w-full flex items-center justify-between">
        <div className="size-8 rounded-full border-2 border-zinc-800">
          <Image
            src={item?.user?.profile_image?.small}
            alt={item?.alt_description}
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
        <p className="text-sm truncate pl-2">{item?.user?.username}</p>
      </div>
    </div>
  );
}

export default CityCard;
