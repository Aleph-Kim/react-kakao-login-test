export const ShowErrorMsg = (error) => {
    const msg =
        error.response?.data?.msg ||
        "일시적인 오류가 발생했습니다. 문제가 지속될 경우 관리자에게 문의해 주세요.";
    alert(msg);

    if (
        (error.status === 400 && msg.includes("일시적인 오류")) ||
        error.status === 500
    ) {
        window.location.reload();
    }
};
