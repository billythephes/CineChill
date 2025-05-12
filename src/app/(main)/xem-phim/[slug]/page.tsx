// @ts-nocheck
"use client";
import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { MovieDetail } from '@/shared/interfaces/IMovieDetail';
import { ApiResponse } from '@/shared/interfaces/IApiResponse';
import { Episode } from '@/shared/interfaces/IEpisode';
import handleAPIs from '@/lib/api/handleAPI';
import Loading from '@/components/ui/loading';
import VideoPlayer from '@/components/movie/video-player';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { AddButton, CommentButton, FavoriteButton, RatingButton, ReportButton, ShareButton, TheaterModeButton, VoteButton } from '@/components/movie/buttons';
import Tags from '@/components/movie/tags';
import Status from '@/components/movie/status';
import Episodes from '@/components/movie/episodes';
import Comments from '@/components/movie/comments';

export default function XemPhim() {
    const [data, setData] = useState<MovieDetail>();
    const [episode, setEpisode] = useState<Episode[]>([]);
    const [videoURL, setVideoURL] = useState('');
    const [isTheaterMode, setIsTheaterMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { slug } = useParams();
    const searchParams = useSearchParams();
    const ver = Number(searchParams.get('ver')) || 1;
    const ep = Number(searchParams.get('ep')) || 1;
    const commentSectionRef = useRef<HTMLDivElement>(null);

    const scrollToComments = () => {
        commentSectionRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    const toggleTheaterMode = () => {
        setIsTheaterMode(prev => !prev);
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response: ApiResponse = await handleAPIs.getData(`https://phimapi.com/phim/${slug}`);
                if (response.status) {
                    setData(response.movie);
                    setEpisode(response.episodes);
                    setVideoURL(response.episodes[ver - 1]?.server_data[ep - 1]?.link_embed || '');
                } else {
                    console.error('No data found');
                }
            } catch (error) {
                console.error('Error fetching movie data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [slug, ver, ep]);

    if (!data) return (
        <div className="flex justify-center items-center h-svh">
            <Loading width={70} height={70} className={""} />
        </div>
    );

    return (
        <div className={`mx-5 mb-40 ${isTheaterMode ? 'relative' : ''}`}>
            {isTheaterMode && (
                <div className="fixed inset-0 bg-black/95 z-51" />
            )}

            <div className='sm:flex hidden flex-row justify-start items-center gap-4 mt-6 md:mt-22.5 xl:mt-26 mb-5 lg:ml-10 '>
                <Link href={`/phim/${slug}`}>
                    <ChevronLeftIcon className="h-7.5 w-7.5 hover:opacity-85 border border-[#FFFFFF80] rounded-full p-0.5 mt-0.5 cursor-pointer" />
                </Link>
                <p className='text-xl font-medium'>Xem Phim {data?.name}</p>
            </div>

            <div className={`${isTheaterMode ? 'relative group z-52' : ''} max-md:-mx-5 `}>

                {videoURL && <VideoPlayer videoUrl={videoURL} thumbUrl={data?.thumb_url ?? ''} />}

                <div className='flex flex-row items-center justify-between bg-black md:rounded-b-xl px-2.5 py-1 lg:px-4 lg:py-2.5'>
                    <div className='flex flex-row items-center xs:space-x-1.5 xl:space-x-4'>
                        <FavoriteButton
                            btnClass={`flex items-center hover:bg-[#FFFFFF10] text-sm gap-2 p-3 rounded-xl ${isTheaterMode ? 'text-black pointer-events-none' : ''}`}
                            iconClass="h-5.5 w-5.5 xs:h-4 xs:w-4"
                            txtClass="hidden xs:block"
                        />

                        <AddButton
                            btnClass={`flex items-center hover:bg-[#FFFFFF10] text-sm gap-2 p-3 rounded-xl ${isTheaterMode ? 'text-black pointer-events-none' : ''}`}
                            iconClass="h-6 w-6 xs:h-4 xs:w-4"
                            txtClass="hidden xs:block"
                        />

                        <TheaterModeButton
                            isActive={isTheaterMode}
                            onClick={toggleTheaterMode}
                        />

                        <ShareButton
                            btnClass={`flex items-center hover:bg-[#FFFFFF10] text-sm gap-2 p-3 rounded-xl ${isTheaterMode ? 'text-black pointer-events-none' : ''}`}
                            iconClass="h-5 w-5 xs:h-4 xs:w-4"
                            txtClass="hidden xs:block"
                        />
                    </div>

                    <ReportButton
                        btnClass={`flex items-center hover:bg-[#FFFFFF10] text-sm gap-2 p-3 rounded-xl ${isTheaterMode ? 'text-black pointer-events-none' : ''}`}
                        iconClass="h-5 w-5 xs:h-4 xs:w-4"
                    />
                </div>
            </div>

            <div className='flex flex-col lg:flex-row lg:mx-2'>
                <div className="flex flex-col flex-7 lg:border-r-[0.1px] border-[#272932] lg:pr-7 lg:mr-11.5">
                    <div className='hidden xl:flex flex-row justify-between mt-8'>
                        <div className="flex flex-row items-center lg:items-start">
                            <div className="relative flex-shrink-0 w-[100px] h-[150px] overflow-hidden lg:mb-0">
                                <Image
                                    src={data.poster_url}
                                    alt={data.name}
                                    fill
                                    className="rounded-lg object-cover"
                                />
                            </div>

                            <div className="flex flex-col items-start ml-6">
                                <Link
                                    href={`/phim/${data.slug}`}
                                    className="text-xl text-center hover:text-[#ffd875] font-medium mb-3">
                                    {data.name}
                                </Link>

                                <p className="text-sm text-center text-[#ffd875] mb-5">{data.origin_name}</p>
                                <Tags data={data} />
                                <Status data={data} />
                            </div>
                        </div>

                        <div className={`flex flex-col max-w-70 text-sm ${data.episode_current !== "Full" ? 'mt-0.5' : ''} `}>
                            <p className="font-semibold mb-2">Giới thiệu:</p>
                            <p
                                className='text-[#AAAAAA] text-justify line-clamp-4'
                                dangerouslySetInnerHTML={{ __html: data.content }}
                            />

                            <Link
                                href={`/phim/${data.slug}`}
                                className="text-[#ffd875] mt-3.5">
                                <span>Thông tin phim</span>
                                <ChevronRightIcon className="h-5 w-5 inline-block -ml-0.5 mb-0.5" />
                            </Link>
                        </div>
                    </div>

                    <hr className={`hidden xl:block text-[#272932] ${data.episode_current !== "Full" ? 'mt-4 mb-7' : data.category.length < 6 ? 'mt-3 mb-7.5' : 'mt-1 mb-7.5'} `} />
                    <div className='xl:hidden mt-8' />
                    <Episodes episode={episode} data={data} />
                    <Comments scrollRef={commentSectionRef} />
                </div>

                <div className='flex-3 mt-8'>
                    <div className='flex flex-row items-center justify-between lg:-ml-7 xl:-ml-6'>
                        <div className='flex flex-row items-center gap-2 xl:gap-3'>
                            <VoteButton />
                            <div className='border-l-[0.1px] border-[#272932] h-13' />
                            <CommentButton
                                btnClass='flex flex-col items-center group hover:bg-[#FFFFFF10] text-[13px] gap-2 p-2 rounded-xl cursor-pointer'
                                iconClass='h-6 w-6 group-hover:text-[#ffd875]'
                                onClick={scrollToComments}
                            />
                        </div>

                        <RatingButton
                            btnClass="flex flex-row items-center bg-[#3556b6] group gap-2.5 pr-3.5 px-3 py-2 rounded-full"
                            voteAverage={data.tmdb.vote_average}
                        />
                    </div>
                    
                    <hr className='hidden lg:block text-[#272932] my-6 -ml-5 xl:-ml-4' />
                </div>
            </div>
        </div>
    );
}