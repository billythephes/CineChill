import Image from 'next/image';

export default function Logo({ width, height, className }: { width: number, height: number, className: string }) {
    return (
        <>
            <Image src="/cinechill.svg"
                alt="cinechill"
                width={width} height={height}
                className={className} />
        </>
    );
}

