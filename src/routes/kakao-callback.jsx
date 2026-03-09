import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function KakaoCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const code = searchParams.get('code');
    const isRequesting = useRef(false);

    useEffect(() => {
        if (!code) {
            navigate('/', { replace: true });
            return;
        }

        if (isRequesting.current) return;

        const handleAuth = async () => {
            isRequesting.current = true;
            try {
                // CSRF 쿠키 발급
                await axios.get('/sanctum/csrf-cookie', {
                    withCredentials: true,
                });

                // 카카오 콜백 요청 (인가 코드를 백엔드에 전달)
                const response = await axios.post(`/api/auth/kakao/login?code=${code}`, {
                    withCredentials: true,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                console.log('카카오 로그인 성공:', response.data);
                navigate('/', { replace: true });
            } catch (error) {
                console.error('카카오 로그인 실패:', error);
                alert('카카오 로그인에 실패했습니다. (' + (error.response?.data?.message || error.message) + ')');
                navigate('/', { replace: true });
            }
        };

        handleAuth();
    }, [code, navigate]);

    return (
        <section className="flex-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-xl border border-gray-200 text-center">
                <p className="text-lg font-semibold text-gray-700">카카오 로그인 처리 중...</p>
                <div className="mt-4 mx-auto w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        </section>
    );
}
