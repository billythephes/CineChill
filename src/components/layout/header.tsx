"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import SearchBar from '../ui/search-bar';
import { navLink, navDropdown } from './nav-items';
import { MainMenu } from '../ui/main-menu';
import Logo from '../ui/logo';
import { FilterMenu } from '../ui/filter-menu';

export default function Header() {

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Handle scroll event to change header background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Cleanup function removes event listener when component unmounts
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`md:fixed relative top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 transition-colors duration-400 ${isScrolled ? 'bg-[#1a1a1a]' : 'md:bg-transparent bg-[#1a1a1a]'
        } text-white`}
    >
      {!isSearchOpen &&
        <div className="flex items-center space-x-7">
          <div className="flex items-center cursor-pointer xl:hidden">
            <MainMenu />
          </div>

          <Link
            href={"/"}
            className="flex items-center space-x-2 text-xl font-bold"
          >
            <Logo width={140} height={42} className='h-auto xl:w-[160px]' />
          </Link>
        </div>
      }

      <SearchBar isSearchOpen={isSearchOpen} />

      <nav className="flex items-center space-x-8 hidden xl:inline-flex">
        {navLink.map((navLink) => (
          <Link
            key={navLink.id}
            href={`/danh-sach/${navLink.slug}`}
            className="hover:text-[#ffd875] transition-colors text-sm"
          >
            {navLink.name}
          </Link>
        ))}

        {navDropdown.map((nav) => (
          <FilterMenu key={nav.id} navDropdown={nav}/>
        ))}
      </nav>

      <button className="flex items-center space-x-1 border-none bg-gray-200 p-2.5 px-4 rounded-full text-sm text-black font-semibold hover:bg-white transition-colors cursor-pointer hidden xl:inline-flex">
        <UserIcon className="h-5 w-5" />
        <span>Thành viên</span>
      </button>

      {!isSearchOpen &&
        <button onClick={toggleSearch}>
          <MagnifyingGlassIcon className="items-center h-[23px] w-[23px] text-white xl:hidden" />
        </button>
      }

      {isSearchOpen &&
        <button onClick={toggleSearch}>
          <XMarkIcon className="items-center h-[33px] w-[33px] ml-6 text-red-400 xl:hidden" />
        </button>
      }
    </header >
  );
}