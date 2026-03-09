import axios from 'axios';
import { useState } from 'react';

function Index() {
    const [login_id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    // 쿠키에서 XSRF-TOKEN 값 가져오기
    const getXsrfToken = () => {
        const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
        return match ? decodeURIComponent(match[1]) : null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 로그인 로직 처리
        try {
            // CSRF 쿠키 먼저 가져오기
            await axios.get('/sanctum/csrf-cookie', {
                withCredentials: true,
            });

            // 쿠키에서 토큰 읽기
            const xsrfToken = getXsrfToken();

            // 로그인 요청
            const response = await axios.post('/api/auth/login',
                { login_id, password },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-XSRF-TOKEN': xsrfToken,
                    },
                }
            );
            console.log('로그인 응답:', response.data);

            // 로그인 성공 후 사용자 정보 가져오기
            const userResponse = await axios.get('/api/user', {
                headers: {
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': xsrfToken,
                },
            });
            console.log('사용자 정보:', userResponse.data);
            setUser(userResponse.data);
            alert('로그인 성공');
        } catch (error) {
            console.error('로그인 실패:', error.response?.data || error.message);
            alert('로그인 실패: ' + (error.response?.data?.message || error.message));
        }
    };


    return (
        <section className="flex-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-xl border border-gray-200">
                <h1 className="text-2xl font-bold text-center mb-8 text-gray-900">로그인 상태 확인</h1>

                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h2 className="text-lg font-semibold text-green-800 mb-2">내 정보</h2>
                    <pre className="text-sm text-green-700 whitespace-pre-wrap overflow-auto">
                        {JSON.stringify(user, null, 2)}
                    </pre>

                    <button
                        type="button"
                        onClick={async () => {
                            try {
                                await axios.post('/api/auth/logout');
                                setUser(null);
                                alert('로그아웃 되었습니다.');
                            } catch (error) {
                                console.error('로그아웃 실패:', error);
                                alert('로그아웃에 실패했습니다.');
                            }
                        }}
                        className="mt-4 w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        로그아웃
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
                            아이디
                        </label>
                        <input
                            type="text"
                            id="id"
                            value={login_id}
                            onChange={(e) => setId(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="아이디를 입력하세요"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            비밀번호
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="비밀번호를 입력하세요"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        로그인하기
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
                            const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

                            if (!REST_API_KEY || !REDIRECT_URI) {
                                alert('카카오 로그인 환경 변수(.env)가 설정되지 않았습니다.');
                                return;
                            }

                            const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
                            window.location.href = kakaoAuthUrl;
                        }}
                        className="w-full py-3 px-4 bg-[#FEE500] hover:bg-[#FADA0A] text-black/85 font-semibold rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                    >
                        카카오 로그인하기
                    </button>
                    <button
                        type="button"
                        onClick={async () => {
                            try {
                                const response = await axios.get('/api/user');
                                setUser(response.data);
                                alert('로그인 상태입니다.');
                            } catch (error) {
                                console.log(error);
                                setUser(null);
                                alert('로그인되어 있지 않습니다.');
                            }
                        }}
                        className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        로그인 여부 확인
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Index;
