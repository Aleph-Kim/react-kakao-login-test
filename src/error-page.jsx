import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1>에러 컴포넌트가 렌더링 됐습니다</h1>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}
