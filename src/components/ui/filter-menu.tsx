// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import Link from "next/link";
import { NavDropdownItem } from "@/shared/interfaces/INavItem";
import handleAPIs from "@/lib/api/handleAPI";
import Loading from "./loading";
import { Items } from "@/shared/interfaces/INavItem";


export function FilterMenu({ navDropdown }: { navDropdown: NavDropdownItem }) {
    const [items, setItems] = useState<Items[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await handleAPIs.getData(navDropdown.api);
                setItems(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [navDropdown.api]);
    return (
        <Menu allowHover>
            <MenuHandler>
                <div
                    className="flex items-center hover:text-[#ffd875] transition-colors text-sm cursor-pointer"
                >
                    {navDropdown.name}
                    <ChevronDownIcon className="h-4 w-4" />
                </div>
            </MenuHandler>
            <MenuList className="grid grid-cols-4 gap-8 outline-none border-none bg-[#373b40] text-white z-100 mt-[21] p-3">
                {loading &&
                    <MenuItem className="flex justify-center items-center col-span-4 h-full">
                        <Loading width={30} height={30} className={""} />
                    </MenuItem>
                }

                {items.map((item) => (
                    <Link key={item._id} href={`/${navDropdown.slug}/${item.slug}`} className="hover:text-[#ffd875] outline-none">
                        <MenuItem>{item.name}</MenuItem>
                    </Link>
                ))}
            </MenuList>
        </Menu>
    );
}