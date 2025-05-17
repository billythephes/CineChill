import React, { useEffect, useState } from "react";
import handleAPIs from "@/lib/api/handleAPI";
import { MovieDetail } from "@/shared/interfaces/IMovieDetail";
import { ApiResponse } from "@/shared/interfaces/IApiResponse";
import Link from "next/link";
import Loading from "@/components/ui/loading";

export default function MovieRecommender({ _id, type, page, sort_field, sort_type, sort_lang, category, country, year, limit }:
    { _id: string, type: string; page: number; sort_field: string; sort_type: string; sort_lang: string; category: string; country: string; year: number; limit: number }) {
    const [data, setData] = useState<MovieDetail[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const type_list = type === "single" ? "phim-le" :
        type === "series" ? "phim-bo" :
            type === "hoathinh" ? "hoat-hinh" :
                "tv-shows";

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await handleAPIs.getData(`https://phimapi.com/v1/api/danh-sach/${type_list}?page=${page}&sort_field=${sort_field}&sort_type=${sort_type}&sort_lang=${sort_lang}&category=${category}&country=${country}&year=${year}&limit=${limit}`) as ApiResponse;
                if (response.status) {
                    let data = response.data.items as MovieDetail[];

                    if (data.some((item) => item._id === _id)) {
                        data = data.filter((item) => item._id !== _id);
                    } else {
                        data.pop();
                    }

                    setData(data);
                } else {
                    console.error('No data found');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);



    return (
        <>
            {isLoading && (
                <div className="flex justify-center items-center h-full py-15">
                    <Loading width={70} height={70} className={""} />
                </div>
            )}

            {!isLoading && (
                <div className="flex flex-col">
                    <p className="text-[19px] xs:text-[22px] font-medium">Đề xuất cho bạn</p>

                    <div className="flex flex-col gap-4 mt-6">
                        {data.map((item, index) => (
                            <Link
                                key={index}
                                href={`/phim/${item.slug}`}
                                className="flex flex-row items-center bg-[#1E1F28] cursor-pointer"
                            >
                                <img
                                    src={`https://phimimg.com/${item.poster_url}`}
                                    alt={item.name}
                                    loading="lazy"
                                    sizes="(max-width: 80px) 100vw"
                                    className="w-[80px] h-[120px] flex-shrink-0 rounded-lg object-cover">
                                </img>

                                <div className="flex flex-col gap-2 p-4 text-[12.6px]">
                                    <p className="text-[13px] sm:text-sm hover:text-[#ffd875] line-clamp-2"
                                        dangerouslySetInnerHTML={{ __html: item.name }}
                                    />

                                    <p className="text-[#AAAAAA] line-clamp-1"
                                        dangerouslySetInnerHTML={{ __html: item.origin_name }}
                                    />

                                    <div className="flex flex-row items-center text-center text-[#AAAAAA] gap-1.5">
                                        <span>{item.year}</span>
                                        <span>&bull;</span>
                                        {item.episode_current === "Full" ? (
                                            <span>{item.time}</span>
                                        ) : (
                                            <span>{item.episode_current}</span>
                                        )}
                                        <span>&bull;</span>
                                        <span>{item.lang}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}