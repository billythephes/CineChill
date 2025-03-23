import React from "react";
import { ChevronRightIcon, Bars3CenterLeftIcon } from "@heroicons/react/24/solid";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import { nav1 } from "../layout/nav-items";
import Link from "next/link";

export function MainMenu() {

    return (
        <Menu>
            <MenuHandler>
                <Bars3CenterLeftIcon className="h-7 w-7 text-white" />
            </MenuHandler>
            <MenuList className="flex flex-col bg-[#373b40] hover:text-[#ffd875] text-white z-100 mt-[14px] ml-3 px-1">
                {nav1.map((nav1) => (
                    <Link href={nav1.route} key={nav1.id}>
                        <MenuItem className="text-left py-1">{nav1.name}</MenuItem>
                    </Link>
                ))}

                <Menu
                    placement="right-start"
                    allowHover
                >
                    <MenuHandler className="flex items-center justify-between py-1">
                        <MenuItem>
                            Thể loại
                            <ChevronRightIcon
                                className='h-3.5 w-3.5 transition-transform'
                            />
                        </MenuItem>
                    </MenuHandler>
                    <MenuList className="bg-[#373b40] text-white px-1">
                        <MenuItem>Nested Item 1</MenuItem>
                        <MenuItem>Nested Item 2</MenuItem>
                        <MenuItem>Nested Item 3</MenuItem>
                    </MenuList>
                </Menu>

                <Menu
                    placement="right-start"
                    allowHover
                >
                    <MenuHandler className="flex items-center justify-between py-1">
                        <MenuItem>
                            Quốc gia
                            <ChevronRightIcon
                                className='h-3.5 w-3.5 transition-transform'
                            />
                        </MenuItem>
                    </MenuHandler>
                    <MenuList className="bg-[#373b40] text-white">
                        <MenuItem>Nested Item 1</MenuItem>
                        <MenuItem>Nested Item 2</MenuItem>
                        <MenuItem>Nested Item 3</MenuItem>
                    </MenuList>
                </Menu>

                <Menu
                    placement="right-start"
                    allowHover
                >
                    <MenuHandler className="flex items-center justify-between py-1">
                        <MenuItem>
                            Năm
                            <ChevronRightIcon
                                className='h-3.5 w-3.5 transition-transform'
                            />
                        </MenuItem>
                    </MenuHandler>
                    <MenuList className="bg-[#373b40] text-white">
                        <MenuItem>Nested Item 1</MenuItem>
                        <MenuItem>Nested Item 2</MenuItem>
                        <MenuItem>Nested Item 3</MenuItem>
                    </MenuList>
                </Menu>
            </MenuList>
        </Menu>
    );
}