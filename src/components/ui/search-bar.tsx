"use client";
import Form from "next/form";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/20/solid';

export default function SearchBar({ isSearchOpen }: { isSearchOpen: boolean }) {

    const [query, setQuery] = useState("");
    const [hasQuery, setHasQuery] = useState(false);

    // Check whether the input contains query
    useEffect(() => {
        if (query !== "") {
            setHasQuery(true);
        } else {
            setHasQuery(false);
        }

    }, [query])         

    return (
        <div className={`relative ${isSearchOpen ? 'flex-grow' : 'flex hidden xl:block'} `}>
            <Form action={"/tim-kiem"}>
                <input
                    name="query"
                    value={query}
                    className="peer block w-full rounded-md py-[10px] pl-10 pr-10 text-sm text-white bg-[#FFFFFF14]"
                    placeholder="Tìm kiếm phim"
                    onChange={(e) => setQuery(e.target.value)}
                />
            </Form>

            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-white" />

            {hasQuery && (
                <XCircleIcon
                    className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-white cursor-pointer"
                    onClick={() => setQuery("")}
                />
            )}
        </div>
    );
}