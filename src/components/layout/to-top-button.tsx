"use client";
import React, { useEffect, useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/solid';

export default function ToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-4 right-4 bg-white text-black p-4 rounded-2xl transition-opacity duration-300 ${isVisible ? 'opacity-150 cursor-pointer' : 'opacity-0 pointer-events-none'}`}
            style={{ transition: 'opacity 0.3s ease' }}
        >
            <ArrowUpIcon className='block w-5 h-5 transition-transform duration-200 hover:translate-y-[-2px]' />
        </button>
    );
};

