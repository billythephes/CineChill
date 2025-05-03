import Link from "next/link";
import { MovieDetail } from "@/shared/interfaces/IMovieDetail";
import { Episode } from "@/shared/interfaces/IEpisode";

export default function Episodes({ episode, data }: { episode: Episode[], data: MovieDetail }) {
    return (
        <div className="space-y-6">
            {episode.map((server, serverIndex) => (
                <div className='flex flex-col gap-4' key={serverIndex}>
                    <p className='font-bold'>
                        Server:&nbsp;
                        <span className='font-medium text-[#ffd875]'>
                            &nbsp;{server.server_name}
                        </span>
                    </p>

                    <div className='grid grid-cols-4 xs:grid-cols-6 sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-7 xl:grid-cols-9 gap-2'>
                        {server.server_data.map((ep, episodeIndex) => (
                            <Link
                                key={episodeIndex}
                                href={`/xem-phim/${data.slug}?ep=${ep.slug}`}
                                className="bg-[#282B3A] hover:text-[#ffd875] text-sm py-1 rounded-sm text-center">
                                {ep.name}
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}