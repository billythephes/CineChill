import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { MovieDetail } from "@/shared/interfaces/IMovieDetail";

export default function Status({ data }: { data: MovieDetail }) {

    const currentEpisode = data?.episode_current.match(/\d+/)?.[0];

    return (
        <>
            {data.status === "ongoing" ? (
                <div className='flex'>
                    <div className='flex flex-row gap-2 text-xs text-[#FF8300] bg-[#FF83001A] px-3 py-2.5 my-4 rounded-full'>
                        <Image src={'/rolling.svg'} alt={'rolling'} width={17} height={17} />
                        <span>Đang chiếu: {currentEpisode} / {data.episode_total} tập</span>
                    </div>
                </div>
            ) : (data.episode_current !== "Full" ? (
                <div className='flex'>
                    <div className='flex flex-row gap-2 text-xs text-[#22CB4C] bg-[#22CB4C1A] px-3 py-2.5 my-4 rounded-full'>
                        <CheckCircleIcon className='h-4 w-4' />
                        <span>Đã hoàn tất: {currentEpisode} / {data.episode_total} tập</span>
                    </div>
                </div>
            ) : <></>
            )}
        </>
    );
}