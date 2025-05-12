'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function VideoPlayer({ videoUrl, thumbUrl }: { videoUrl: string, thumbUrl: string }) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [videoError, setVideoError] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const checkVideoAvailability = async () => {
            setIsLoading(true);
            if (!videoUrl) {
                setVideoError(true);
                return;
            }

            try {
                const response = await fetch(videoUrl, {
                    method: 'HEAD',
                    mode: 'no-cors'
                });

            } catch (error) {
                setVideoError(true);
            } finally {
                setIsLoading(false);
            }
        };

        checkVideoAvailability();

        const iframe = iframeRef.current;
        if (iframe) {
            const handleIframeError = () => setVideoError(true);
            iframe.addEventListener('error', handleIframeError);
            return () => iframe.removeEventListener('error', handleIframeError);
        }
    }, [videoUrl]);

    if (isLoading || videoError) {
        return (
            <div className="relative flex items-center justify-center w-full aspect-video bg-cover bg-center rounded-xl shadow-xl overflow-hidden "
                style={{ backgroundImage: `url('${thumbUrl}')` }}>
                <div className="absolute inset-0 bg-black/80"></div>
                {videoError && (
                    <div className="flex flex-col items-center gap-4 xs:gap-6 z-10">
                        <Image
                            src="https://media.tenor.com/koDHxtD1Iz4AAAAM/cry-crying.gif"
                            alt="Video không khả dụng"
                            width={220}  
                            height={220}
                            className="w-25 h-25 xs:w-30 xs:h-30 lg:w-55 lg:h-55 object-cover rounded-3xl"
                            unoptimized
                        />
                        <p className="text-base xs:text-lg sm:text-xl lg:text-2xl text-[#e3dfdf] font-medium">
                            <span>Video không khả dụng</span>
                            <span className='hidden xs:inline-block'>&nbsp;hoặc không thể tải được</span>
                        </p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="md:rounded-t-xl shadow-xl overflow-hidden">
            <iframe
                ref={iframeRef}
                src={videoUrl}
                allowFullScreen
                width="100%"
                title="Video player"
                className="aspect-video"
            />
        </div>
    );
}