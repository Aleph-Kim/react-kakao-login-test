export const ShowSuccessMsg = (response) => {
   alert(response.data?.msg || '정상적으로 완료 되었습니다.')
}