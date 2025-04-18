// @ts-nocheck
"use client";
import React, { useEffect, useState, useRef } from "react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import handleAPIs from "@/lib/api/handleAPI";
import { Movie } from "@/shared/interfaces/IMovie";
import { MovieDetail } from "@/shared/interfaces/IMovieDetail";
import { ApiResponse } from "@/shared/interfaces/IApiResponse";
import Loading from "../ui/loading";
import { motion, AnimatePresence } from "framer-motion";

export default function TopSlider() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [data, setData] = useState<MovieDetail[]>([]);
    const [randomData, setRandomData] = useState<MovieDetail[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const swiperRef = useRef<any>(null);

    useEffect(() => {
        const fetchDetailData = async (movies: Movie[]) => {
            try {
                const detailedMovies = await Promise.all(
                    movies.map(async (movie) => {
                        const response: ApiResponse = await handleAPIs.getData(`https://phimapi.com/phim/${movie.slug}`);
                        if (response.status) {
                            return { ...movie, ...response.movie } as MovieDetail;
                        }
                        return movie as MovieDetail;
                    })
                );
                setData(detailedMovies);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response: ApiResponse = await handleAPIs.getData('https://phimapi.com/danh-sach/phim-moi-cap-nhat');
                if (response.status) {
                    await fetchDetailData(response.items);
                } else {
                    console.error('No data found');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const getRandomElements = (array: MovieDetail[], count: number) => {
        const shuffled = [...array].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    };

    useEffect(() => {
        if (data.length > 0) {
            setRandomData(getRandomElements(data, 6));
        }
    }, [data]);

    useEffect(() => {
        return () => {
            if (swiperRef.current?.pagination?.el) {
                const container = swiperRef.current.pagination.el;
                try {
                    const oldListener = container.getAttribute('click-listener');
                    if (oldListener) {
                        container.removeEventListener('click', JSON.parse(oldListener));
                    }
                } catch (error) {
                    console.log('Cleanup: No listener to remove');
                }
            }
        };
    }, []);

    const handleSwiper = (swiper: any) => {
        if (!swiper || !swiper.pagination || !swiper.pagination.el) return;

        swiperRef.current = swiper;
        const container = swiper.pagination.el;

        // Safely remove old listener if it exists
        try {
            const oldListener = container.getAttribute('click-listener');
            if (oldListener) {
                const parsedListener = JSON.parse(oldListener);
                if (typeof parsedListener === 'function') {
                    container.removeEventListener('click', parsedListener);
                }
            }
        } catch (error) {
            console.log('No previous listener found');
        }

        // Add new click handler
        const clickHandler = (event: Event) => {
            const target = event.target as HTMLElement;
            if (!target) return;

            const index = target.getAttribute('data-index') ||
                target.closest('[data-index]')?.getAttribute('data-index');

            if (index !== null) {
                swiper.slideTo(Number(index));
            }
        };

        container.addEventListener('click', clickHandler);

        // Store stringified function name instead of the full function
        container.setAttribute('click-listener', 'thumbnailClickHandler');
    };

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-center items-center h-screen"
                    >
                        <Loading width={100} height={100} className={""} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="slider"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 1.2,
                            ease: "easeOut",
                            delay: 0.2
                        }}
                    >
                        <Swiper
                            pagination={{
                                type: "custom",
                                renderCustom: (swiper, current, total) => {
                                    const thumbnails = randomData.map((item, index) => (
                                        `<div style="display: inline-block; 
                                            box-shadow: ${index === current - 1 ? '0 0 0 3px #ffbd59' : 'none'}; 
                                            transition: box-shadow 0.3s;"
                                        class="lg:rounded-none rounded-full"
                                        onmouseover="this.style.boxShadow='0 0 0 3px #ffbd59'" 
                                        onmouseout="this.style.boxShadow='${index === current - 1 ? '0 0 0 3px #ffbd59' : 'none'}'" >
                                        <img src="${item.thumb_url}" alt="Thumbnail ${item.name}" 
                                            class="lg:w-[60px] lg:h-[40px] lg:rounded-none cursor-pointer object-cover w-7 h-7 rounded-full"
                                            data-index="${index}"/>
                                    </div>`
                                    )).join('');

                                    const currentMovie = randomData[current - 1];
                                    const categories = currentMovie?.category?.map((category, index) =>
                                        `<span class="text-xs text-white bg-[#FFFFFF10] px-1.5 py-1 rounded">
                                        ${category.name}
                                    </span>`
                                    ).join('');

                                    return `
                                    <div class="relative z-10">
                                        <div class="flex flex-col items-center sm:items-start sm:pl-7 sm:pb-11 pb-1">
                                            <a href="/phim/${currentMovie?.slug}" 
                                            class="relative max-w-2xl text-center sm:text-start text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white hover:text-[#ffd875] transition-colors">
                                                ${currentMovie?.name}
                                            </a>

                                            <div class="flex flex-nowrap items-center gap-1.5 sm:gap-2.5 text-white sm:text-xs text-[10px] sm:mt-7 mt-3">
                                                <span class="border border-white bg-[#FFFFFF10] sm:px-1.5 sm:py-1 rounded px-1 py-0.25">
                                                    ${currentMovie?.year}
                                                </span>
                                                ${currentMovie?.chieurap ?
                                            `<span class="border border-white bg-[#FFFFFF10] sm:px-1.5 sm:py-1 rounded px-1 py-0.25">
                                                        ${currentMovie?.time}
                                                    </span>` :
                                            `<span class="border border-white bg-[#FFFFFF10] sm:px-1.5 sm:py-1 rounded px-1 py-0.25">
                                                        ${currentMovie?.episode_current}
                                                    </span>`
                                        }
                                                <span class="border border-white bg-[#FFFFFF10] sm:px-1.5 sm:py-1 rounded px-1 py-0.25">
                                                    ${currentMovie?.quality}
                                                </span>
                                                <span class="border border-white bg-[#FFFFFF10] sm:px-1.5 sm:py-1 rounded px-1 py-0.25">
                                                    ${currentMovie?.lang}
                                                </span>
                                            </div>

                                            <div class="sm:flex flex-nowrap gap-3 mt-3 hidden">
                                                ${categories}
                                            </div>

                                            <p class="max-w-xl text-start text-white text-sm mt-6 hidden md:block">
                                                <span class="overflow-hidden">
                                                    <span class="line-clamp-3 text-ellipsis">
                                                        ${currentMovie?.content}
                                                    </span>
                                                </span>
                                            </p>

                                            <div class="flex items-center justify-center sm:justify-between w-full sm:mt-8 mt-6">
                                                <div class="sm:flex gap-8 hidden">
                                                    <a href="/xem-phim/${currentMovie?.slug}" 
                                                    class="rounded-full bg-gradient-to-bl from-yellow-100 to-orange-400 hover:shadow-lg transition-shadow duration-300 p-4"
                                                    style="transition: box-shadow 0.3s ease;"
                                                    onmouseover="this.style.boxShadow='0 5px 10px 10px rgba(255, 218, 125, .15)'" 
                                                    onmouseout="this.style.boxShadow='none'">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                                                            class="h-9 w-9 ml-1 text-black">
                                                            <path fill-rule="evenodd" 
                                                                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" 
                                                                clip-rule="evenodd" />
                                                        </svg>
                                                    </a>

                                                    <div class="flex items-center border-2 border-white/20 group hover:border-white rounded-full px-6 my-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                                                            class="h-6 w-6 text-white hover:text-[#ffd875]">
                                                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                                        </svg>

                                                        <div class="border-1 border-white/20 h-full mx-5 group-hover:border-white"></div>

                                                        <a href="/phim/${currentMovie?.slug}">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                                                                class="h-6 w-6 text-white hover:text-[#ffd875]">
                                                                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </div>
                                                
                                                <div class="flex items-center space-x-2.5 sm:pr-8">
                                                    ${thumbnails}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `;
                                },
                            }}
                            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                            onSwiper={handleSwiper}
                            autoplay={{ delay: 1000 }}
                            loop={true}
                            effect={'fade'}
                            modules={[Autoplay, Navigation, Pagination, EffectFade]}
                            className="h-60 xs:h-85 sm:h-105 md:h-155 lg:h-155 xl:h-165 cursor-grab"
                        >
                            {randomData.map((data) => (
                                <SwiperSlide key={data._id} className="relative h-auto">
                                    <div className="absolute inset-0">
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                background: `url(${data.thumb_url}) center center / cover scroll no-repeat`,
                                                boxShadow: 'inset 100px 0 250px 120px rgba(0, 0, 0, 0.6)',
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/20" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}


