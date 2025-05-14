import Link from "next/link";
import { MovieDetail } from "@/shared/interfaces/IMovieDetail";

export default function Tags({ data }: { data: MovieDetail }) {

    const currentEpisode = data?.episode_current.match(/\d+/)?.[0];

    return (
        <>
            <div className="flex flex-nowrap items-center gap-1.5 sm:gap-2.5 sm:text-xs text-[10px] mb-3">
                <span className="border border-white bg-[#FFFFFF10] sm:px-1.5 sm:py-1 rounded px-1 py-0.25">{data.year}</span>
                {data.episode_current === "Full" ? (
                    <span className="border border-white bg-[#FFFFFF10] sm:px-1.5 sm:py-1 rounded px-1 py-0.25">{data.time}</span>
                ) : (
                    <span className="border border-white bg-[#FFFFFF10] sm:px-1.5 sm:py-1 rounded px-1 py-0.25">Tập {currentEpisode}</span>
                )}
                <span className="border border-white bg-[#FFFFFF10] sm:px-1.5 sm:py-1 rounded px-1 py-0.25">{data.quality}</span>
                <span className="border border-white bg-[#FFFFFF10] sm:px-1.5 sm:py-1 rounded px-1 py-0.25">{data.lang}</span>
            </div>

            <div className={`flex flex-wrap max-xs:justify-center gap-3 ${data.episode_current === "Full" ? 'mb-8' : ''} `}>
                {data.category.map((category, index) => (
                    <Link key={index}
                        href={`/the-loai/${category.slug}`}
                        className="text-xs bg-[#FFFFFF10] hover:text-[#ffd875] px-1.5 py-1 rounded">
                        {category.name}
                    </Link>
                ))}
            </div>
        </>
    );
}