import React, { useEffect, useRef, useState, useCallback } from "react";
import { ArrowUp } from "lucide-react";

const ToTop = () => {
    const buttonRef = useRef(null);
    const progressBarRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const handleScrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        let rafId = null;
        let lastScrollY = window.scrollY;

        const updateProgress = () => {
            const scrollTop = document.documentElement.scrollTop;

            // 버튼 활성화 상태 업데이트
            setIsVisible(scrollTop > 100);

            // 스크롤 진행률 계산
            const scrollPercent =
                (window.scrollY /
                    (document.documentElement.scrollHeight -
                        window.innerHeight)) *
                100;

            // 프로그레스 바 업데이트
            if (progressBarRef.current) {
                progressBarRef.current.style.background = `conic-gradient(rgb(128, 128, 128) 0% ${scrollPercent}%, #e4e4e4 ${scrollPercent}% 100%)`;
            }

            rafId = null;
        };

        const handleScroll = () => {
            // 스크롤 값이 변경되었을 때만 RAF 예약
            if (lastScrollY !== window.scrollY) {
                lastScrollY = window.scrollY;

                if (!rafId) {
                    rafId = requestAnimationFrame(updateProgress);
                }
            }
        };

        // 초기 상태 설정
        updateProgress();

        // 스크롤 이벤트 리스너 등록
        document.addEventListener("scroll", handleScroll, { passive: true });

        // cleanup 함수
        return () => {
            document.removeEventListener("scroll", handleScroll);
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
        };
    }, []);

    return (
        <button
            ref={buttonRef}
            className={`relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-xl transition-opacity duration-300 lg:h-16 lg:w-16 ${isVisible ? "opacity-100" : "opacity-0"} `}
            onClick={handleScrollToTop}
            aria-label="맨 위로 스크롤"
        >
            <ArrowUp className="z-2" />
            <div
                ref={progressBarRef}
                className="absolute top-0 left-0 z-0 h-full w-full rounded-full before:absolute before:top-1/2 before:left-1/2 before:-z-9 before:h-[90%] before:w-[90%] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-white before:content-['']"
            ></div>
        </button>
    );
};

export default function FixedBtn() {
    return (
        <div className="fixed right-14 bottom-12 z-99 flex flex-col gap-6">
            <ToTop />
        </div>
    );
}
