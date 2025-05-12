import { FlagIcon, HeartIcon, PlusIcon } from '@heroicons/react/16/solid';
import { StarIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid';

export const FavoriteButton = ({ btnClass, iconClass, txtClass }: { btnClass: string, iconClass: string, txtClass: string }) => (
    <button className={`${btnClass}`}>
        <HeartIcon className={`${iconClass}`} />
        <span className={`${txtClass}`}>Yêu thích</span>
    </button>
);

export const AddButton = ({ btnClass, iconClass, txtClass }: { btnClass: string, iconClass: string, txtClass: string }) => (
    <button className={`${btnClass}`}>
        <PlusIcon className={`${iconClass}`} />
        <span className={`${txtClass}`}>Thêm vào</span>
    </button>
);

export const ShareButton = ({ btnClass, iconClass, txtClass }: { btnClass: string, iconClass: string, txtClass: string }) => (
    <button className={`${btnClass}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className={`${iconClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        <span className={`${txtClass}`}>Chia sẻ</span>
    </button>
);

export const CommentButton = ({ btnClass, iconClass, onClick }: { btnClass: string, iconClass: string, onClick: () => void }) => (
    <button className={`${btnClass}`} onClick={onClick}>
        <ChatBubbleBottomCenterTextIcon className={`${iconClass}`} />
        <span>Bình luận</span>
    </button>
);

export const TheaterModeButton = ({ isActive, onClick }: { isActive: boolean, onClick: () => void }) => (
    <button
        className={`lg:flex hidden items-center text-sm gap-2 p-3 rounded-xl cursor-pointer 
        ${isActive
                ? 'group-hover:bg-[#2e334c] text-black group-hover:text-white transition-all duration-300 ease-in-out'
                : 'hover:bg-[#FFFFFF10]'
            }`}
        onClick={onClick}
    >
        <span>Rạp phim</span>
        {isActive ? (
            <span className="text-[10px] border border-black group-hover:border-[#ffd875] px-1 py-0.5 rounded-sm transition-[border-color] duration-300 ease-in-out">
                ON
            </span>
        ) : (
            <span className="text-[10px] border border-[#FFFFFF80] px-1 py-0.5 rounded-sm text-[#FFFFFF80]">
                OFF
            </span>
        )}
    </button>
);

export const ReportButton = ({ btnClass, iconClass }: { btnClass: string, iconClass: string }) => (
    <button className={`${btnClass}`}>
        <FlagIcon className={`${iconClass}`} />
        <span className='hidden xs:block'>Báo lỗi</span>
    </button>
);

export const VoteButton = () => (
    <button className="flex flex-col items-center group hover:bg-[#FFFFFF10] text-[13px] gap-2 p-2 rounded-xl">
        <StarIcon className="h-6 w-6 group-hover:text-[#ffd875]" />
        <span>Đánh giá</span>
    </button>
);

export const RatingButton = ({ btnClass, voteAverage }: { btnClass: string, voteAverage: number }) => (
    <button className={`${btnClass}`}>
        <StarIcon className="h-5 w-5 text-yellow-500" />
        <span className="text-base font-bold">{voteAverage.toFixed(1)}</span>
        <span className="hidden sm:block text-[11px] group-hover:underline">Đánh giá</span>
    </button>
);