// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from 'next/navigation';
import Image from "next/image";
import handleAPIs from "@/lib/api/handleAPI";
import { ApiResponse, Items } from "@/shared/interfaces/IApiResponse";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";
import Loading from "@/components/ui/loading";

export default function DanhSach() {
    const [data, setData] = useState<Items>();
    const [currentPage, setCurrentPage] = useState(1);
    const [inputPage, setInputPage] = useState('1');
    const [isLoading, setIsLoading] = useState(false);

    const { slug } = useParams();
    const searchParams = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;

    if (!Array.isArray(slug) || slug?.length !== 2)
        return;

    const fetchData = async (pageNumber: number) => {
        setIsLoading(true);
        try {
            const response: ApiResponse = await handleAPIs.getData(
                `https://phimapi.com/v1/api/${slug[0]}/${slug[1]}?page=${pageNumber}&sort_field=modified.time&sort_type=desc&limit=30`
            );
            if (response.status) {
                setData(response.data);
                setCurrentPage(pageNumber);
                setInputPage(pageNumber.toString());
            } else {
                console.error('No data found');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [slug]);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > (data?.params.pagination.totalPages || 1)) return;
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set('page', newPage.toString());

        window.history.pushState(null, '', `?${currentParams.toString()}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setInputPage(value);
    };

    const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const pageNumber = parseInt(inputPage);
            if (pageNumber && pageNumber !== currentPage) {
                handlePageChange(pageNumber);
            }
        }
    };

    return (
        <div className="flex flex-col px-5 md:py-29 py-12">

            <p className="text-[25px] font-medium mb-12">{data?.titlePage}</p>

            {isLoading && (
                <div className="flex justify-center items-center h-full">
                    <Loading width={70} height={70} className={""} />
                </div>
            )}

            {!isLoading && (
                <>
                    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {data?.items.map((item, index) => (
                            <div key={index} className="flex flex-col items-center gap-3">
                                <Link href={`/phim/${item.slug}`}
                                    className="relative flex-shrink-0 hover:opacity-80 xl:w-[200px] xl:h-[300px] lg:w-[180px] lg:h-[270px] md:w-[175px] md:h-[263px] sm:w-[150px] sm:h-[230px] w-[155px] h-[233px]">
                                    <Image
                                        src={`https://phimimg.com/${item.poster_url}`}
                                        alt={item.name}
                                        title={item.name}
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
                                        title={item.name}
                                        className="text-xs sm:text-sm text-center hover:text-[#ffd875] line-clamp-1">
                                        <p dangerouslySetInnerHTML={{ __html: item.name }} />
                                    </Link>

                                    <Link href={`/phim/${item.slug}`}
                                        title={item.origin_name}
                                        className="text-xs sm:text-sm text-center text-[#AAAAAA] line-clamp-1">
                                        <p dangerouslySetInnerHTML={{ __html: item.origin_name }} />
                                    </Link>
                                </div>

                            </div>
                        ))}
                    </div><div className="flex flex-row justify-center items-center my-15">
                        <button
                            className={`bg-[#2F3346] rounded-full p-3.5 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#3a4054] cursor-pointer'}`}
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1 || isLoading}
                        >
                            <ArrowLeftIcon className="w-5 h-5" />
                        </button>

                        <div className="flex flex-row items-center gap-3 bg-[#2F3346] rounded-full px-5 py-3 mx-2">
                            <span>Trang</span>
                            <input
                                className="w-[50px] h-[28px] bg-[#1C1F2E] rounded text-center"
                                value={inputPage}
                                onChange={handleInputChange}
                                onKeyDown={handleInputSubmit}
                                disabled={isLoading} />
                            <span>/ {data?.params.pagination.totalPages || 1}</span>
                        </div>

                        <button
                            className={`bg-[#2F3346] rounded-full p-3.5 ${currentPage === (data?.params.pagination.totalPages || 1) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#3a4054] cursor-pointer'}`}
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === (data?.params.pagination.totalPages || 1) || isLoading}
                        >
                            <ArrowRightIcon className="w-5 h-5" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

