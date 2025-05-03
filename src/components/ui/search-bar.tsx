// @ts-nocheck
"use client";
import Form from "next/form";
import { useEffect, useRef, useState } from "react";
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/20/solid';
import handleAPIs from "@/lib/api/handleAPI";
import { MovieDetail } from "@/shared/interfaces/IMovieDetail";
import { ApiResponse } from "@/shared/interfaces/IApiResponse";
import Link from "next/link";
import Loading from "@/components/ui/loading";
import { escapeHtmlAndEncodeSpaces } from "@/lib/utils";

export default function SearchBar({ isSearchOpen }: { isSearchOpen: boolean }) {
    const [query, setQuery] = useState("");
    const [hasQuery, setHasQuery] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [data, setData] = useState<MovieDetail[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const debounceTimeout = setTimeout(async () => {
            if (query.trim()) {
                setHasQuery(true);
                setIsLoading(true);
                try {
                    const response: ApiResponse = await handleAPIs.getData(
                        `https://phimapi.com/v1/api/tim-kiem?keyword=${escapeHtmlAndEncodeSpaces(query)}&page=1&sort_field=name&sort_type=desc&limit=5`
                    );
                    if (response.status) {
                        setData(response.data.items as MovieDetail[]);
                    } else {
                        setData([]);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setData([]);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setHasQuery(false);
                setData([]);
            }
        }, 300);
        return () => clearTimeout(debounceTimeout);
    }, [query]);

    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCloseSearch = () => {
        setQuery("");
        setHasQuery(false);
    };

    return (
        <div className={`relative ${isSearchOpen ? 'flex-grow' : 'flex hidden xl:block'}`} ref={searchRef}>
            <Form action={"/tim-kiem"} onSubmit={handleCloseSearch}>
                <input
                    name="q"
                    value={query}
                    className="peer block w-full rounded-md py-[10px] pl-10 pr-10 text-sm text-white bg-[#FFFFFF14]"
                    placeholder="Tìm kiếm phim"
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                />
            </Form>

            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-white pointer-events-none" />

            {hasQuery && (
                <XCircleIcon
                    className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-white cursor-pointer"
                    onClick={handleCloseSearch}
                />
            )}

            {hasQuery && isFocused && (

                <div className="absolute top-full left-0 right-0 mt-1.5 flex flex-col bg-[#15161f] text-white gap-7 p-6 min-w-77 xl:w-97 rounded-t-md">
                    {isLoading ? (
                        <div className="flex justify-center">
                            <Loading width={40} height={40} className={""} />
                        </div>
                    ) : data.length > 0 ? (
                        <>
                            {data.map((item, index) => (
                                <Link
                                    key={index}
                                    href={`/phim/${item.slug}`}
                                    onClick={handleCloseSearch}
                                    className="flex flex-row items-center gap-3.5 hover:opacity-75 cursor-pointer"
                                >
                                    <img
                                        src={`https://phimimg.com/${item.poster_url}`}
                                        alt={item.name}
                                        loading="lazy"
                                        sizes="(max-width: 53px) 100vw"
                                        className="w-[53px] h-[73px] xs:h-[70px] flex-shrink-0 rounded-sm object-cover">
                                    </img>

                                    <div className="flex flex-col justify-between gap-1.5 text-[13px] sm:text-sm">
                                        <p dangerouslySetInnerHTML={{ __html: item.name }} />

                                        <p className="text-[#AAAAAA]"
                                            dangerouslySetInnerHTML={{
                                                __html: item.origin_name.length > 40
                                                    ? item.origin_name.slice(0, 40) + '...'
                                                    : item.origin_name
                                            }} />

                                        <div className="flex flex-row items-center text-center text-[#AAAAAA] gap-2">
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

                            <Link href={`/tim-kiem?q=${query}`}
                                className="absolute top-full left-0 right-0 flex justify-center text-sm hover:text-[#ffd875] bg-[#25272f] cursor-pointer rounded-b-md py-3.5"
                                onClick={handleCloseSearch}>
                                <p>Toàn bộ kết quả</p>
                            </Link>
                        </>
                    ) : (
                        <p className="text-center text-sm">Không tìm thấy kết quả nào</p>
                    )}
                </div>
            )}
        </div>
    );
}