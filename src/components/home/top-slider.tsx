"use client";
import React, { useEffect, useState, useRef, ReactNode } from "react";
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
import { motion, AnimatePresence, MotionProps } from "framer-motion";
import { getRandomElements } from "@/lib/utils";

// Error boundary component to catch rendering errors
interface ErrorBoundaryState {
    hasError: boolean;
    error: any;
}

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true, error };
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.error("Slider error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="text-center p-10 bg-black/50 rounded-lg">
                    <h2 className="text-red-400 text-xl mb-3">Something went wrong with the slider</h2>
                    <button
                        onClick={() => this.setState({ hasError: false })}
                        className="px-4 py-2 bg-[#ffbd59] text-black rounded"
                    >
                        Try again
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

interface MotionDivProps extends MotionProps {
    children: ReactNode;
    className?: string;
}

const MotionDiv = ({ children, ...props }: MotionDivProps) => {
    return <motion.div {...props}>{children}</motion.div>;
};

export default function TopSlider() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [data, setData] = useState<MovieDetail[]>([]);
    const [randomData, setRandomData] = useState<MovieDetail[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const swiperRef = useRef<any>(null);
    const activeSwiperIndex = useRef<number>(0);

    // Safe access function to prevent undefined errors
    const safeGet = (obj: any, path: string, defaultValue: any = undefined) => {
        const keys = path.split('.');
        let result = obj;

        for (const key of keys) {
            if (result === undefined || result === null) {
                return defaultValue;
            }
            result = result[key];
        }
        return result !== undefined ? result : defaultValue;
    };

    // Function to log errors consistently
    const logError = (message: string, error: any) => {
        console.error(`[TopSlider] ${message}:`, error);
        setErrorMessage(message);
        setHasError(true);
    };

    useEffect(() => {
        const fetchDetailData = async (movies: Movie[]) => {
            try {
                if (!Array.isArray(movies)) {
                    throw new Error("Invalid movies data - not an array");
                }

                const detailedMovies = await Promise.all(
                    movies.map(async (movie) => {
                        try {
                            if (!movie || !movie.slug) {
                                throw new Error("Invalid movie data - missing slug");
                            }

                            const response = await handleAPIs.getData(`https://phimapi.com/phim/${movie.slug}`) as ApiResponse;
                            if (response.status && response.movie) {
                                return { ...movie, ...response.movie } as MovieDetail;
                            }
                            return movie as MovieDetail;
                        } catch (movieError) {
                            console.warn(`Error fetching details for movie ${movie?.slug || 'unknown'}:`, movieError);
                            return movie as MovieDetail; // Return basic movie if detail fetch fails
                        }
                    })
                );

                // Filter out any undefined or null entries
                const validMovies = detailedMovies.filter(movie => movie !== null && movie !== undefined);
                setData(validMovies);
            } catch (error) {
                console.error('Error fetching movie details', error);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchData = async () => {
            setIsLoading(true);
            setHasError(false);
            try {
                const response = await handleAPIs.getData('https://phimapi.com/danh-sach/phim-moi-cap-nhat') as ApiResponse;
                if (response.status && response.items && Array.isArray(response.items)) {
                    await fetchDetailData(response.items);
                }
            } catch (error) {
                logError('Error fetching data', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const random = getRandomElements(data, 6);
            setRandomData(random);
        }
    }, [data]);

    useEffect(() => {
        return () => {
            if (swiperRef.current?.pagination?.el) {
                const container = swiperRef.current.pagination.el;
                try {
                    // Find and remove any click event listeners
                    const allEvents = getEventListeners(container);
                    if (allEvents?.click?.length > 0) {
                        allEvents.click.forEach((event) => {
                            container.removeEventListener('click', event.listener);
                        });
                    }
                } catch (error) {
                    console.log('Cleanup: Error removing listeners', error);
                }
            }
        };
    }, []);

    interface EventListenerInfo {
        listener: EventListener;
    }

    // Safe way to get event listeners
    const getEventListeners = (element: any) => {
        try {
            return { click: [] as EventListenerInfo[] };
        } catch (error) {
            return { click: [] as EventListenerInfo[] };
        }
    };

    const handleSwiper = (swiper: any) => {
        if (!swiper || !swiper.pagination || !swiper.pagination.el) return;

        swiperRef.current = swiper;
        const container = swiper.pagination.el;

        // Store the initial index
        activeSwiperIndex.current = swiper.activeIndex;

        // Create a safer click handler
        const clickHandler = (event: Event) => {
            try {
                const target = event.target as HTMLElement;
                if (!target) return;

                const index = target.getAttribute('data-index') ||
                    target.closest('[data-index]')?.getAttribute('data-index');

                if (index !== null) {
                    const numIndex = Number(index);
                    // Validate the index is within bounds
                    if (!isNaN(numIndex) && numIndex >= 0 && numIndex < randomData.length) {
                        swiper.slideTo(numIndex);
                        activeSwiperIndex.current = numIndex;
                    }
                }
            } catch (error) {
                console.error("Error in click handler:", error);
            }
        };

        // Remove existing click listeners
        try {
            const allEvents = getEventListeners(container);
            if (allEvents?.click?.length > 0) {
                allEvents.click.forEach((event) => {
                    container.removeEventListener('click', event.listener);
                });
            }
        } catch (error) {
            console.log('Error removing listeners', error);
        }

        // Add new click handler
        container.addEventListener('click', clickHandler);
    };

    // Handle slide change safely
    const handleSlideChange = (swiper: { activeIndex: any; }) => {
        if (swiper) {
            const index = swiper.activeIndex;
            setActiveIndex(index);
            activeSwiperIndex.current = index;
        }
    };

    // Fallback data for when current movie is undefined
    const getFallbackMovie = () => {
        // Try to use active index, then fall back to first movie
        const currentIndex = activeSwiperIndex.current;
        if (randomData && randomData.length > 0) {
            if (randomData[currentIndex]) {
                return randomData[currentIndex];
            }
            return randomData[0];
        }
        return null;
    };

    // Get current movie safely
    const getCurrentMovie = (current: number) => {
        if (!randomData || randomData.length === 0) return null;

        // Adjust for 1-based indexing in the renderer
        const adjustedIndex = current - 1;

        // Make sure we're in bounds
        if (adjustedIndex >= 0 && adjustedIndex < randomData.length) {
            return randomData[adjustedIndex];
        }

        // Fall back to stored reference
        return getFallbackMovie();
    };

    // Custom renderer with safety checks
    const renderCustomPagination = (swiper: any, current: number, total: any) => {
        try {
            if (!randomData || randomData.length === 0) {
                return `<div class="p-4 text-white">Loading content...</div>`;
            }

            const currentMovie = getCurrentMovie(current);

            if (!currentMovie) {
                return `<div class="p-4 text-white">Movie content unavailable</div>`;
            }

            // Create thumbnails with safety checks
            const thumbnails = randomData.map((item, index) => {
                if (!item || !item.thumb_url) return '';

                return `<div style="display: inline-block; 
                    box-shadow: ${index === current - 1 ? '0 0 0 3px #ffbd59' : 'none'}; 
                    transition: box-shadow 0.3s;"
                    class="lg:rounded-none rounded-full"
                    onmouseover="this.style.boxShadow='0 0 0 3px #ffbd59'" 
                    onmouseout="this.style.boxShadow='${index === current - 1 ? '0 0 0 3px #ffbd59' : 'none'}'" >
                    <img src="${item.thumb_url}" alt="Thumbnail ${safeGet(item, 'name', 'Movie')}" 
                        class="lg:w-[60px] lg:h-[40px] lg:rounded-none cursor-pointer object-cover w-7 h-7 rounded-full"
                        data-index="${index}"/>
                </div>`;
            }).join('');

            // Safe category rendering
            const categories = safeGet(currentMovie, 'category', [])
                .map((category: { name: string; }) => {
                    if (!category || !category.name) return '';
                    return `<span class="text-xs text-white bg-[#FFFFFF10] px-1.5 py-1 rounded">
                        ${category.name}
                    </span>`;
                }).join('');

            // Build the full UI with safety checks
            return `
            <div class="relative z-10">
                <div class="flex flex-col items-center sm:items-start sm:pl-7 sm:pb-11 pb-1">
                    <a href="/phim/${safeGet(currentMovie, 'slug', '')}" 
                    class="relative max-w-2xl text-center sm:text-start text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white hover:text-[#ffd875] transition-colors">
                        ${safeGet(currentMovie, 'name', 'Movie Title')}
                    </a>

                    <a href="/phim/${safeGet(currentMovie, 'slug', '')}" 
                    class="relative max-w-2xl text-center sm:text-start text-xs sm:text-sm lg:text-base text-[#ffd875] mt-0.5 xs:mt-1 sm:mt-2 lg:mt-3 xl:mt-4">
                        ${safeGet(currentMovie, 'origin_name', '')}
                    </a>

                    <div class="flex flex-nowrap items-center gap-1.5 sm:gap-2.5 text-white sm:text-xs text-[10px] mt-2.5 xs:mt-3 sm:mt-4">
                        <span class="border border-white bg-[#FFFFFF10] sm:px-1.5 sm:py-1 rounded px-1 py-0.25">
                            ${safeGet(currentMovie, 'year', 'N/A')}
                        </span>
                        ${safeGet(currentMovie, 'episode_current', '') === "Full" ?
                    `<span class="border border-white bg-[#FFFFFF10] sm:px-1.5 sm:py-1 rounded px-1 py-0.25">
                                ${safeGet(currentMovie, 'time', 'N/A')}
                            </span>` :
                    `<span class="border border-white bg-[#FFFFFF10] sm:px-1.5 sm:py-1 rounded px-1 py-0.25">
                                ${safeGet(currentMovie, 'episode_current', 'N/A')}
                            </span>`
                }
                        <span class="border border-white bg-[#FFFFFF10] sm:px-1.5 sm:py-1 rounded px-1 py-0.25">
                            ${safeGet(currentMovie, 'quality', 'N/A')}
                        </span>
                        <span class="border border-white bg-[#FFFFFF10] sm:px-1.5 sm:py-1 rounded px-1 py-0.25">
                            ${safeGet(currentMovie, 'lang', 'N/A')}
                        </span>
                    </div>

                    <div class="sm:flex flex-nowrap gap-3 mt-3 hidden">
                        ${categories}
                    </div>

                    <p class="max-w-xl text-start text-white text-sm mt-6 hidden md:block">
                        <span class="overflow-hidden">
                            <span class="line-clamp-3 text-ellipsis">
                                ${safeGet(currentMovie, 'content', 'No description available.')}
                            </span>
                        </span>
                    </p>

                    <div class="flex items-center justify-center sm:justify-between w-full sm:mt-8 mt-6">
                        <div class="sm:flex gap-8 hidden">
                            <a href="/xem-phim/${safeGet(currentMovie, 'slug', '')}" 
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

                                <a href="/phim/${safeGet(currentMovie, 'slug', '')}">
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
        } catch (error) {
            console.error("Error rendering pagination:", error);
            return `<div class="p-4 text-white">Error loading content. Please try refreshing.</div>`;
        }
    };

    return (
        <ErrorBoundary>
            <AnimatePresence>
                {isLoading ? (
                    <MotionDiv
                        key="loading"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-center items-center h-screen"
                    >
                        <Loading width={100} height={100} className={""} />
                    </MotionDiv>
                ) : (
                    <MotionDiv
                        key="slider"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 1.2,
                            ease: "easeOut",
                            delay: 0.2
                        }}
                    >
                        {randomData.length > 0 ? (
                            <Swiper
                                pagination={{
                                    type: "custom",
                                    renderCustom: renderCustomPagination,
                                }}
                                onSlideChange={handleSlideChange}
                                onSwiper={handleSwiper}
                                autoplay={{ delay: 5000 }}
                                loop={true}
                                effect={'fade'}
                                modules={[Autoplay, Navigation, Pagination, EffectFade]}
                                className="h-60 xs:h-85 sm:h-105 md:h-155 lg:h-155 xl:h-165 cursor-grab"
                            >
                                {randomData.map((movie, index) => (
                                    <SwiperSlide key={movie?._id || index} className="relative h-auto">
                                        <div className="absolute inset-0">
                                            <div
                                                className="absolute inset-0"
                                                style={{
                                                    background: `url(${safeGet(movie, 'thumb_url', '/placeholder.jpg')}) center center / cover scroll no-repeat`,
                                                    boxShadow: 'inset 100px 0 250px 120px rgba(0, 0, 0, 0.6)',
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-black/20" />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <div className="flex justify-center items-center h-60 xs:h-85 sm:h-105 md:h-155 bg-black/50">
                                <p className="text-white text-lg">No movies available</p>
                            </div>
                        )}
                    </MotionDiv>
                )}
            </AnimatePresence>
        </ErrorBoundary>
    );
}