// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import Link from "next/link";

interface Items {
    _id: string;
    name: string;
    slug: string;
}

export function FilterMenu({ navDropdown }: { navDropdown: any }) {
    const [items, setItems] = useState<Items[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(navDropdown.api);
                const data = await response.json();
                console.log(data);
                setItems(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [navDropdown.api]);
    return (
        <Menu allowHover>
            <MenuHandler>
                <div
                    className="flex items-center hover:text-[#ffd875] transition-colors text-sm"
                >
                    {navDropdown.name}
                    <ChevronDownIcon className="h-4 w-4" />
                </div>
            </MenuHandler>
            <MenuList className="grid grid-cols-4 gap-8 outline-none bg-[#373b40] text-white z-100 mt-[21] p-3">
                {items.map((item) => (
                    <Link key={item._id} href={`/${item.slug}`} className="hover:text-[#ffd875] outline-none">
                        <MenuItem>{item.name}</MenuItem>
                    </Link>
                ))}
            </MenuList>
        </Menu>
    );
}