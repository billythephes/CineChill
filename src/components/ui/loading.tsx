import Image from 'next/image';

export default function Loading({ width, height, className }: { width: number, height: number, className: string }) {
    return (
        <>
            <Image src="/loading.svg"
                alt="loading"
                width={width} height={height}
                className={className} />
        </>
    );
}

