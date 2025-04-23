// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { ChevronRightIcon, Bars3CenterLeftIcon } from "@heroicons/react/24/solid";
import { Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { navLink, navDropdown } from "../layout/nav-items";
import Link from "next/link";
import handleAPIs from "@/lib/api/handleAPI";
import Loading from "./loading";
import { Items } from "@/shared/interfaces/INavItem";

export function MainMenu() {
    const [items, setItems] = useState<Items[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Create array of Promises to fetch data from all URLs
                const promises = navDropdown.map(nav => handleAPIs.getData(nav.api));
                const data = await Promise.all(promises);
                setItems(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [navDropdown]);
    return (
        <Menu>
            <MenuHandler>
                <Bars3CenterLeftIcon className="h-7 w-7 text-white" />
            </MenuHandler>
            <MenuList className="flex flex-col bg-[#373b40] outline-none border-none text-white z-100 mt-[14px] p-2">
                {navLink.map((navLink) => (
                    <Link href={`/danh-sach/${navLink.slug}`} key={navLink.id} className="hover:text-[#ffd875] outline-none">
                        <MenuItem className="text-left p-1">{navLink.name}</MenuItem>
                    </Link>
                ))}

                {navDropdown.map((nav, index) => (
                    <Menu
                        placement="right-start"
                        allowHover
                        key={index}
                    >
                        <MenuHandler className="flex items-center justify-between hover:text-[#ffd875] p-1">
                            <MenuItem>
                                {nav.name}
                                <ChevronRightIcon
                                    className='h-3 w-3 transition-transform'
                                />
                            </MenuItem>
                        </MenuHandler>
                        <MenuList className="grid grid-cols-2 gap-4 outline-none border-none bg-[#373b40] z-100 text-white ml-[3px] p-3 max-h-100 overflow-y-auto">
                            {loading &&
                                <MenuItem className="flex justify-center items-center col-span-2 h-full">
                                    <Loading width={30} height={30} className={""} />
                                </MenuItem>
                            }

                            {items[index] && items[index].map((item) => (
                                <Link
                                    key={item._id}
                                    href={`/${nav.slug}/${item.slug}`}
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