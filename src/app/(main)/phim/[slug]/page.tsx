"use client";
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { MovieDetail } from '@/shared/interfaces/IMovieDetail';
import { ApiResponse } from '@/shared/interfaces/IApiResponse';
import handleAPIs from '@/lib/api/handleAPI';
import Link from 'next/link';
import { PlayIcon } from '@heroicons/react/24/solid';
import { Episode } from '@/shared/interfaces/IEpisode';
import Tags from '@/components/movie/tags';
import Status from '@/components/movie/status';
import Episodes from '@/components/movie/episodes';
import Comments from '@/components/movie/comments';
import Loading from "@/components/ui/loading";
import { AddButton, CommentButton, FavoriteButton, RatingButton, ShareButton } from '@/components/movie/buttons';
import MovieRecommender from '@/components/movie/movie-recommender';
import { getRandomElements } from '@/lib/utils';

export default function Phim() {
    const [data, setData] = useState<MovieDetail>();
    const [episode, setEpisode] = useState<Episode[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { slug } = useParams();

    const commentSectionRef = useRef<HTMLDivElement>(null);

    const scrollToComments = () => {
        commentSectionRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await handleAPIs.getData(`https://phimapi.com/phim/${slug}`) as ApiResponse;
                if (response.status) {
                    setData(response.movie);
                    setEpisode(response.episodes);
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
    }, []);

    if (!data) return (
        <div className="flex justify-center items-center h-svh">
            <Loading width={70} height={70} className={""} />
        </div>
    );

    return (
        <div className="min-h-screen pb-12">
            <div className="relative h-60 xs:h-85 lg:h-164 w-full">
                <div className="absolute inset-0 bg-cover bg-center opacity-70"
                    style={{ backgroundImage: `url(${data.thumb_url})` }}>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-gray-900/80 to-transparent"></div>
            </div>

            <div className="sm:mx-8.5 px-4 -mt-47.5 lg:-mt-75 relative z-10">
                <div className="flex flex-col lg:flex-row items-center lg:items-start">
                    <div className="relative w-[120px] h-[180px] lg:w-48 lg:h-72 overflow-hidden">
                        <Image
                            src={data.poster_url}
                            alt={data.name}
                            fill
                            className="rounded-lg object-cover"
                        />
                    </div>

                    <div className="flex flex-col items-center lg:items-start lg:ml-8">
                        <p className={`text-xl sm:text-2xl lg:text-3xl font-medium lg:font-bold mb-2 mt-5 ${data.episode_current !== "Full" ? 'lg:mt-0' : ''} `}>{data.name}</p>
                        <p className="text-sm sm:text-base text-[#ffd875] mb-4">{data.origin_name}</p>

                        <Tags data={data} />

                        <Status data={data} />

                        <div className="flex flex-nowrap flex-col lg:flex-row items-center text-sm gap-4 lg:gap-10">
                            <Link href={`/xem-phim/${data.slug}`}
                                className="bg-gradient-to-bl from-yellow-100 to-orange-400 hover:shadow-lg transition-shadow duration-300 text-black text-base font-medium py-4.5 px-25 lg:px-6 rounded-full flex items-center"
                                style={{ transition: 'box-shadow 0.3s ease' }}
                                onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 5px 10px 10px rgba(255, 218, 125, .15)'}
                                onMouseOut={(e) => e.currentTarget.style.boxShadow = 'none'}>
                                <PlayIcon className="h-5 w-5 mr-2" />
                                Xem Ngay
                            </Link>

                            <div className='flex flex-row items-center space-x-2 xs:space-x-4 sm:space-x-6 lg:space-x-5.5 xl:space-x-6'>
                                <FavoriteButton
                                    btnClass="flex flex-col items-center group hover:bg-[#FFFFFF10] text-[13px] gap-1 p-2 rounded-xl"
                                    iconClass="h-5 w-5 group-hover:text-[#ffd875]"
                                    txtClass={''}
                                />

                                <AddButton
                                    btnClass="flex flex-col items-center group hover:bg-[#FFFFFF10] text-[13px] gap-1 p-2 rounded-xl"
                                    iconClass="h-5 w-5 group-hover:text-[#ffd875]"
                                    txtClass={''}
                                />

                                <ShareButton
                                    btnClass="flex flex-col items-center group hover:bg-[#FFFFFF10] text-[13px] gap-1 p-2 rounded-xl"
                                    iconClass="h-5 w-5 group-hover:text-[#ffd875]"
                                    txtClass={''}
                                />

                                <CommentButton
                                    btnClass="xs:flex hidden flex-col items-center group hover:bg-[#FFFFFF10] text-[13px] gap-1 p-2 rounded-xl cursor-pointer"
                                    iconClass="h-5 w-5 group-hover:text-[#ffd875]"
                                    onClick={scrollToComments}
                                />

                                <RatingButton
                                    btnClass="flex flex-row items-center bg-[#3556b6] group gap-2.5 pr-3.5 px-3 py-2 ml-2.5 lg:ml-6 rounded-full"
                                    voteAverage={data.tmdb.vote_average}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row mt-12 gap-10 lg:gap-23'>
                    <div className="flex flex-col flex-1 gap-5 text-sm">
                        <div>
                            <p className="font-semibold mb-2">Giới thiệu:</p>
                            <p className='text-[#AAAAAA] font-thin text-justify' dangerouslySetInnerHTML={{ __html: data.content }} />
                        </div>

                        <div>
                            <span className="font-semibold">Thời lượng: &nbsp;</span>
                            <span className='text-sm text-[#AAAAAA] font-thin'>{data.time}</span>
                        </div>

                        <div>
                            <span className="font-semibold">Quốc gia: &nbsp;</span>
                            <span className='font-thin'>{data.country.map(country => country.name).join(', ')}</span>
                        </div>

                        <div>
                            <span className="font-semibold">Đạo diễn: &nbsp;</span>
                            <span className='font-thin'>{data.director.join(', ')}</span>
                        </div>

                        <div>
                            <span className="font-semibold">Diễn viên: &nbsp;</span>
                            {data.actor.map((actor, index) => (
                                <Link href={"https://www.google.com.vn/search?q=" + actor}
                                    target="_blank"
                                    key={index}
                                    className='inline-block'>
                                    <span key={index} className='hover:text-[#ffd875] font-thin'>
                                        {actor}
                                    </span>
                                    {index < data.actor.length - 1 && <span className='text-[#AAAAAA]'>,&nbsp;</span>}
                                </Link>
                            ))}
                        </div>

                        <div className='hidden lg:block'>
                            <hr className='text-[#272932] my-4' />
                            <MovieRecommender
                                _id={data._id}
                                type={data.type}
                                page={1} sort_field={''}
                                sort_type={''}
                                sort_lang={''}
                                category={getRandomElements(data.category, 1)[0].slug}
                                country={getRandomElements(data.country, 1)[0].slug}
                                year={2025}
                                limit={7}
                            />
                        </div>
                    </div>

                    <div className='flex-2'>
                        <Episodes episode={episode} data={data} ver={0} ep={0} />
                        <Comments scrollRef={commentSectionRef} />
                    </div>
                </div>
            </div>
        </div>
    );
}