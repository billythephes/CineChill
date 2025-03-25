// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { ChevronRightIcon, Bars3CenterLeftIcon } from "@heroicons/react/24/solid";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import { navLink, navDropdown } from "../layout/nav-items";
import Link from "next/link";

interface Items {
    map(arg0: (item: any) => React.JSX.Element): React.ReactNode;
    _id: string;
    name: string;
    slug: string;
}

export function MainMenu() {
    const [items, setItems] = useState<Items[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Create array of Promises to fetch data from all URLs
                const promises = navDropdown.map(nav => fetch(nav.api));
                const responses = await Promise.all(promises);

                // Convert responses to JSON
                const data = await Promise.all(responses.map(response => response.json()));
                console.log(data);
                setItems(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [navDropdown]);
    return (
        <Menu>
            <MenuHandler>
                <Bars3CenterLeftIcon className="h-7 w-7 text-white" />
            </MenuHandler>
            <MenuList className="flex flex-col bg-[#373b40] hover:text-[#ffd875] text-white z-100 mt-[14px] p-2">
                {navLink.map((navLink) => (
                    <Link href={navLink.route} key={navLink.id}>
                        <MenuItem className="text-left p-1">{navLink.name}</MenuItem>
                    </Link>
                ))}

                {navDropdown.map((nav, index) => (
                    <Menu
                        placement="right-start"
                        allowHover
                        key={index}
                    >
                        <MenuHandler className="flex items-center justify-between p-1">
                            <MenuItem>
                                {nav.name}
                                <ChevronRightIcon
                                    className='h-3 w-3 transition-transform'
                                />
                            </MenuItem>
                        </MenuHandler>
                        <MenuList className="grid grid-cols-2 gap-4 outline-none bg-[#373b40] z-100 text-white ml-[3px] p-3 max-h-100 overflow-y-auto">
                            {items[index] && items[index].map((item) => (
                                <Link
                                    key={item._id}
                                    href={`/${item.slug}`}
                                    className="hover:text-[#ffd875] outline-none">
                                    <MenuItem>{item.name}</MenuItem>
                                </Link>
                            ))}
                        </MenuList>
                    </Menu>
                ))}
            </MenuList>
        </Menu>
    );
}