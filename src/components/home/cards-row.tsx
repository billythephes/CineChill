// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import handleAPIs from "@/lib/api/handleAPI";
import { MovieDetail } from "@/shared/interfaces/IMovieDetail";
import { ApiResponse } from "@/shared/interfaces/IApiResponse";
import Link from "next/link";
import Loading from "@/components/ui/loading";

export default function CardsRow({ title, type_list, page, sort_field, sort_type, sort_lang, category, country, year, limit }:
    { title: string, type_list: string; page: number; sort_field: string; sort_type: string; sort_lang: string; category: string; country: string; year: number; limit: number }) {
    const [data, setData] = useState<MovieDetail[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response: ApiResponse = await handleAPIs.getData(`https://phimapi.com/v1/api/danh-sach/${type_list}?page=${page}&sort_field=${sort_field}&sort_type=${sort_type}&sort_lang=${sort_lang}&category=${category}&country=${country}&year=${year}&limit=${limit}`);
                if (response.status) {
                    setData(response.data.items as MovieDetail[]);
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
                <div className="flex flex-col pt-5">
                    <div className="flex items-center gap-4 mb-4">
                        <p className="text-xl sm:text-2xl font-medium">{title}</p>
                        <Link href={`/danh-sach/${type_list}`}>
                            <ChevronRightIcon className="h-5 w-5 sm:h-6 sm:w-6 hover:text-[#ffd875] border hover:border-[#ffd875] border-white rounded-full p-0.5 mt-0.5" />
                        </Link>
                    </div>

                    <div className="flex flex-nowrap overflow-x-auto hidden-scrollbar gap-4">
                        {data.map((item, index) => (
                            <div key={index} className="flex flex-col items-center gap-4">
                                <Link href={`/phim/${item.slug}`}
                                    className="relative flex-shrink-0 hover:opacity-80 xl:w-[205px] xl:h-[310px] lg:w-[180px] lg:h-[270px] md:w-[150px] md:h-[230px] sm:w-[120px] sm:h-[180px] w-[100px] h-[150px]">
                                    <Image
                                        src={`https://phimimg.com/${item.poster_url}`}
                                        alt={item.name}
                                        loading="lazy"
                                        fill
                                        sizes="(max-width: 205px) 100vw"
                                        className="rounded-lg object-cover">
                                    </Image>

                                    <div className="absolute flex flex-row items-center bottom-0 left-1/2 transform -translate-x-1/2 text-[9px] sm:text-[11px]">
                                        {item.lang === 'Vietsub' && (
                                            <>
                                                <p className="border-0 rounded-t-sm bg-[#5e6070] px-2 py-1">
                                                    P.Đề
                                                </p>
                                            </>
                                        )}

                                        {item.lang === 'Lồng tiếng' && (
                                            <>
                                                <p className="border-0 rounded-t-sm bg-[#2ca35d] px-2 py-1">
                                                    L.Tiếng
                                                </p>
                                            </>
                                        )}

                                        {item.lang === 'Thuyết minh' && (
                                            <>
                                                <p className="border-0 rounded-t-sm bg-[#1667cf] px-2 py-1">
                                                    T.Minh
                                                </p>
                                            </>
                                        )}


                                        {item.lang === 'Vietsub + Lồng Tiếng' && (
                                            <>
                                                <p className="border-0 rounded-tl-sm bg-[#5e6070] px-2 py-1">
                                                    P.Đề
                                                </p>
                                                <p className="border-0 rounded-tr-sm bg-[#2ca35d] px-2 py-1">
                                                    L.Tiếng
                                                </p>
                                            </>
                                        )}

                                        {item.lang === 'Vietsub + Thuyết Minh' && (
                                            <>
                                                <p className="border-0 rounded-tl-sm bg-[#5e6070] px-2 py-1">
                                                    P.Đề
                                                </p>
                                                <p className="border-0 rounded-tr-sm bg-[#1667cf] px-2 py-1">
                                                    T.Minh
                                                </p>
                                            </>
                                        )}

                                        {item.lang === 'Vietsub + Thuyết Minh + Lồng Tiếng' && (
                                            <>
                                                <p className="border-0 rounded-tl-sm bg-[#5e6070] px-2 py-1">
                                                    P.Đề
                                                </p>
                                                <p className="border-0 bg-[#2ca35d] px-2 py-1">
                                                    L.Tiếng
                                                </p>
                                                <p className="border-0 rounded-tr-sm bg-[#1667cf] px-2 py-1">
                                                    T.Minh
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </Link>

                                <div className="flex flex-col gap-1">
                                    <Link href={`/phim/${item.slug}`}
                                        className="text-xs sm:text-sm text-center hover:text-[#ffd875]">
                                        <p dangerouslySetInnerHTML={{
                                            __html: item.name.length > 26
                                                ? item.name.slice(0, 26) + '...'
                                                : item.name
                                        }} />
                                    </Link>

                                    <Link href={`/phim/${item.slug}`}
                                        className="text-xs sm:text-sm text-center text-[#AAAAAA]">
                                        <div dangerouslySetInnerHTML={{
                                            __html: item.origin_name.length > 26
                                                ? item.origin_name.slice(0, 26) + '...'
                                                : item.origin_name
                                        }} />
                                    </Link>
                                </div>

                            </div>
                        ))}
                    </div>
                </div >
            )}
        </>
    );
}