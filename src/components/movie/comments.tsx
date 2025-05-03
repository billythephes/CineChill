import { useState } from 'react';
import { ChatBubbleBottomCenterTextIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Comments({ scrollRef }: { scrollRef: React.RefObject<HTMLDivElement | null> }) {
    const [commentText, setCommentText] = useState('');
    const [isOn, setIsOn] = useState(false);

    const handleToggle = () => {
        setIsOn(prevState => !prevState);
    };

    return (
        <div ref={scrollRef} className="mt-12">
            <div className="flex flex-row items-center mb-4 gap-4">
                <ChatBubbleBottomCenterTextIcon className="h-7 w-7 mt-1.5" />
                <p className="text-2xl font-medium">
                    <span>Bình luận</span>
                    <span> (0)</span>
                </p>
            </div>

            <div className="text-sm text-[#AAAAAA] mb-4">
                Vui lòng <Link href="#" className="text-[#ffd875] hover:underline">đăng nhập</Link> để tham gia bình luận.
            </div>

            <div className="relative bg-[#FFFFFF10] rounded-xl p-2.5">
                <textarea
                    className="w-full bg-[#191B24] text-sm rounded-xl p-3 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-[#ffd875]"
                    placeholder="Viết bình luận"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}>
                </textarea>

                <div className="absolute top-3.5 right-5 text-xs text-[#AAAAAA]">0 / 1000</div>

                <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center">
                        <div className={`relative inline-block w-7 h-4.5 rounded-full overflow-hidden border flex items-center ${isOn ? 'border-[#ffd875]' : 'border-[#696a70]'}`} >
                            <input
                                type="checkbox"
                                className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                                checked={isOn}
                                onChange={handleToggle}
                            />
                            <div
                                className={`absolute w-2 h-2 rounded-full transition-all duration-300 ease-in-out ${isOn ? 'left-4 bg-[#ffd875]' : 'left-1 bg-[#696a70]'}`}
                                style={{ top: '50%', transform: 'translateY(-50%)' }}
                            />
                        </div>
                        <span className="ml-2 text-sm">Ẩn danh?</span>
                    </div>

                    <button
                        className="flex items-center text-[#ffd875] font-medium hover:opacity-80 gap-2 mr-3 cursor-pointer"
                        disabled={!commentText.trim()}
                    >
                        Gửi
                        <PaperAirplaneIcon className='w-6 h-6' />
                    </button>
                </div>
            </div>
        </div>
    );
}