// import { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from 'swiper/modules';

// // css Start
// import 'swiper/css';
// import 'swiper/css/pagination';
// import styled from "styled-components";

// // styles
// const PopupWrap = styled.div`
//       z-index: 9999;
//       position: fixed;
//       top: 0px;
//       left: 0px;
//       width: 100%;
//       height: 100%;
//       padding-bottom: 40px;
//       background-color: rgba(0, 0, 0, 0.35);
//     .pop {
//       display: block;
//       position: absolute;
//       top: 50%;
//       left: 50%;
//       transform: translate(-50%, -50%);
//       width: 500px;
//    }

//     .m-ratioBox-wrap {
//       width: 100%;
//       padding-top: 100%;
//       position: relative;
//       overflow: hidden;
//    }

//     .m-ratioBox-wrap .m-ratioBox {
//       position: absolute;
//       top: 0;
//       left: 0;
//       right: 0;
//       bottom: 0;
//       background-size: cover;
//       background-position: center;
//       background-color: var(--sub_color01);
//    }
//     .m-ratioBox-wrap img {
//       display: block;
//       width: 100%;
//       height: 100%;
//       object-fit: cover;
//       position: absolute;
//       left: 50%;
//       top: 50%;
//       transform: translateY(-50%) translateX(-50%);
//       z-index: 1;
//    }
//     .m-ratioBox-wrap iframe {
//       width: 105%;
//       position: absolute;
//       left: 50%;
//       top: 50%;
//       transform: translateY(-50%) translateX(-50%);
//       z-index: 1;
//    }
//     .pop .btn-toggle {
//       width: 40px;
//       height: 40px;
//       position: relative;
//       background-color: black;
//       cursor: pointer;
//    }
//     .pop .btn-toggle img {
//       width: auto;
//       position: absolute;
//       top: 50%;
//       left: 50%;
//       transform: translate(-50%, -50%) rotate(-90deg);
//       transition: all .3s;
//    }
//     .pop-btns {
//       z-index: 9;
//       position: absolute;
//       bottom: 0px;
//       left: 0px;
//       display: flex;
//       justify-content: space-between;
//       width: 100%;
//       height: 40px;
//       background-color: #3c3c3c;
//    }
//     .pop-btns a {
//       color: #fff;
//       padding: 7px 14px;
//    }
//     .pop-btns #oneday_check {
//       position: absolute;
//       clip: rect(0, 0, 0, 0);
//    }
//     .pop-btns #oneday_check+label {
//       display: flex;
//       align-items: center;
//       padding: 0 10px;
//       font-size: 14px;
//       color: #fff;
//       cursor: pointer;
//    }
//     .pop-btns #oneday_check+label:before {
//       content: "";
//       display: inline-block;
//       width: 12px;
//       height: 12px;
//       margin-right: 10px;
//       border: 1px solid #fff;
//    }
//     .pop .swiper-btn-control {
//       width: 8px;
//       height: 11px;
//       margin-left: 16px;
//       position: relative;
//       top: 2px;
//    }
//     .swiper-control {
//       display: flex;
//       align-items: center;
//       position: absolute;
//       top: 21px;
//       right: 20px;
//       z-index: 2;
//    }
//    & .popupSwiper  {
//       background-color: #fff;
//       & .swiper-pagination{
//          pointer-events: none;
//          top: 21px;
//          left: auto;
//          right: 20px;
//          width: fit-content;
//       }
//    }
//     .swiper-pagination-bullet {
//       flex: 0 0 auto;
//       width: 10px;
//       height: 10px;
//       margin: 0 5px;
//       border-radius: 0;
//       border: 1px solid white;
//       opacity: 0.5;
//       background-color: transparent;
//    }
//     & .swiper-pagination-bullet-active {
//       background-color: #fff;
//       opacity: 1;
//    }
//    .active {
//       right: -400px;
//    }
//    .active .btn-toggle {
//       transform: rotate(180deg);
//    }
//     .pop .btn-close {
//       width: 40px;
//       height: 40px;
//       background-color: black;
//    }
//    @media screen and (max-width:1279px){
//       .pop {
//          width: 310px;
//       }

//       &.active {
//          right: -310px;
//       }
//    }
//    @media screen and (max-width:767px){
//       top: 50%;
//       right: unset;
//       left: 50%;
//       transform: translate(-50%, -50%);
//       .pop-btns {
//          transform: translateY(100%);
//          top: unset;
//          bottom: 0;
//          left: 0;
//          width: 100%;
//          justify-content: space-between;
//       }
//       .pop .btn-toggle {
//          display: none;
//       }
//       .pop .btn-close {
//          display: block;
//       }
//    }
// `

// const Popup = ({ mainData }) => {
//    const popupData = mainData?.popup;

//    // 쿠키 설정 함수
//    const setCookie = (name, value, days) => {
//       const date = new Date();
//       date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//       const expires = "expires=" + date.toUTCString();
//       document.cookie = name + "=" + value + ";" + expires + ";path=/";
//    };

//    // 쿠키 가져오기 함수
//    const getCookie = (name) => {
//       const nameEQ = name + "=";
//       const ca = document.cookie.split(';');
//       for (let i = 0;i < ca.length;i++) {
//          let c = ca[i];
//          while (c.charAt(0) === ' ') c = c.substring(1, c.length);
//          if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
//       }
//       return null;
//    };

//    const [isVisible, setIsVisible] = useState(false);

//    useEffect(() => {
//       const onedayCookie = getCookie('onedayPopup');
//       if (!onedayCookie) {
//          setIsVisible(true);
//       }
//    }, []);

//    const handleOnedayCheck = () => {
//       setCookie('onedayPopup', 'true', 1);
//       setIsVisible(false);
//    };

//    const handleClose = () => {
//       setIsVisible(false);
//    };

//    if (!isVisible || !popupData || popupData.length === 0) {
//       return;
//    }

//    return (
//       <PopupWrap id="popParent" >
//          <div className="pop">
//             <Swiper
//                autoplay={{
//                   delay: 3000,
//                   disableOnInteraction: false,
//                }}
//                loop={true}
//                pagination={true}
//                modules={[Autoplay, Pagination]}
//                className="popupSwiper"
//             >
//                {popupData ? (
//                   popupData.map((popup, index) => (
//                      <SwiperSlide key={index}>
//                         {popup.link ? (
//                            <a href={popup.link} className="swiper-slide" target="_blank" rel="noreferrer">
//                               <div className="m-ratioBox-wrap">
//                                  <div className="m-ratioBox">
//                                     <img src={popup.file.file_addr} alt="" />
//                                  </div>
//                               </div>
//                            </a>
//                         ) : (
//                            <div className="swiper-slide">
//                               <div className="m-ratioBox-wrap">
//                                  <div className="m-ratioBox">
//                                     <img src={popup.file.file_addr} alt="" />
//                                  </div>
//                               </div>
//                            </div>
//                         )}
//                      </SwiperSlide>
//                   ))
//                ) : (
//                   <div className="hide_txt">Loading ...</div>
//                )}
//             </Swiper>
//             <div className="pop-btns">
//                <input type="checkbox" name="oneday" id="oneday_check" onClick={handleOnedayCheck} />
//                <label htmlFor="oneday_check">
//                   <span className="icon"></span> 오늘하루 보지 않기
//                </label>
//                <button className="btn-close" onClick={handleClose}>
//                   <i className="xi-close" style={{ color: "#fff" }}></i>
//                </button>
//             </div>
//          </div>
//       </PopupWrap >
//    )
// }

// export default Popup;
