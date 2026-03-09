// import styled from 'styled-components';

// // styles
// const PaginationWrap = styled.ul`
//    display: flex;
//    justify-content: center;
//    align-items: center;
//    flex-wrap: wrap;
//    margin-top: 56px;
//    margin-bottom: 56px;
//    @media screen and (max-width:1024px){
//       margin-top: 24px;
//       margin-bottom: 24px;
//    }
// `
// const BtnPage = styled.button`
//    display: flex;
//    justify-content: center;
//    align-items: center;
//    width: 40px;
//    height: 40px;
//    color: #202020;
//    &.on{
//       border-radius: 50%;
//       color: #fff;
//       background-color: #202020;
//    }
// `

// export default function Pagination({ data, pageIndex, setPageIndex }) {

//    const prevClick = () => {
//       data.current_page > 1 && setPageIndex(data.current_page - 1);
//    }
//    const nextClick = () => {
//       data.current_page < data.last_page && setPageIndex(data.current_page + 1);
//    }
//    const handleClick = (label) => {
//       setPageIndex(label)
//    }

//    return (
//       <PaginationWrap className="xl:mt-40 mt-30 xl:mb-110">
//          {data.links.map((links, index) => (
//             links.label === "&laquo; Previous" ? (
//                <li key={index} data-index={index}>
//                   <BtnPage onClick={() => { prevClick() }} className="control_btn">
//                      <i className="xi-angle-left-min xl:text-20 text-14"></i>
//                   </BtnPage>
//                </li>
//             ) : links.label === "Next &raquo;" ? (
//                <li key={index} data-index={index}>
//                   <BtnPage onClick={() => { nextClick() }} className="control_btn">
//                      <i className="xi-angle-right-min xl:text-20 text-14"></i>
//                   </BtnPage>
//                </li>
//             ) : (
//                links.label === "..." ? (
//                   <li key={index}>
//                      <BtnPage style={{ cursor: "not-allowed" }}>
//                         {links.label}
//                      </BtnPage>
//                   </li>
//                ) : (
//                   <li key={index}>
//                      <BtnPage
//                         onClick={() => { handleClick(links.label) }}
//                         className={`control_btn pagination xl:text-16 text-14 ${parseInt(pageIndex) === parseInt(links.label) ? "on" : ""}`}
//                      >
//                         {links.label}
//                      </BtnPage>
//                   </li >
//                )
//             )
//          ))
//          }
//       </PaginationWrap >
//    )
// }
