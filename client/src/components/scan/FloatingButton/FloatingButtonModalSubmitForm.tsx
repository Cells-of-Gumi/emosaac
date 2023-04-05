/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import UseAnimations from 'react-useanimations';
// EVERY ANIMATION NEEDS TO BE IMPORTED FIRST -> YOUR BUNDLE WILL INCLUDE ONLY WHAT IT NEEDS
import radioButton from 'react-useanimations/lib/radioButton'

import Button from "@/components/UI/Button/Button";
import Portal from "@/components/function/Portal";
import { postOcr } from "@/api/ocr/postOcr";
import { useRouter } from "next/router";

import {
  MdCookie,
  MdOutlineCookie,
  MdOutlinePersonOutline,
  MdPerson,
} from "react-icons/md";
import {
  RiBookReadFill,
  RiBookReadLine,
  RiPlayCircleFill,
  RiPlayCircleLine,
  RiArrowLeftSLine,
} from "react-icons/ri";


interface FloatingButtonModalSubmitFormProps {
    modalHandler: Function;
    phaseHandler: Function;
    onClickSubmitHandler: Function;
    isDarkMode: boolean;
}

const FloatingButtonModalSubmitForm = ({modalHandler, phaseHandler, onClickSubmitHandler, isDarkMode}: FloatingButtonModalSubmitFormProps) => {
    const [currentTheme, setCurrentTheme] = useState<any>()
    const inputRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        const temp = document.documentElement.getAttribute("data-theme")
        setCurrentTheme(() => temp)
        
    }, [])

  const [image, setImage] = useState<File | null>(null);
  const [contentType, setContentType] = useState<0 | 1>(0)

  const onClickImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
      console.log(inputRef)
    }
  };


    const descDetail = (
      <div className={'detail-backdrop'} css={backdropCSS}>
        <div css={descDetailWrapperCSS}>
          <img css={exampleImgCSS} src={'/assets/scan_example.jpg'} />
          <div css={descStringWrapperCSS}>
            <div css={css`font-size: 18px; font-weight: 700; margin-bottom: 8px;`}>어떤 이미지를 사용하면 되나요?</div>
            <div css={css`font-size: 15px; font-weight: 500; color: var(--text-color-4);`}>웹툰의 제목이 포함된 보관함이 잘 보이게 스크린샷을 찍고, 스캔을 시작하세요!</div>
          </div>
          
        </div>
      </div>
      
    )
  

    return(
        <>
          
            <div>
            <div css={headerCSS}>
            <img css={headerIconCSS} src={isDarkMode === true ? "/assets/scan_icon_white.png" : "/assets/scan_icon.png"}/>
            <div css={headerTitleCSS}>  
                작품 스캔
            </div>
            <div css={descWrapperCSS}>
              <div css={css`color: var(--text-color-4); margin-top: 20px; margin-bottom: 5px;`}>각 플랫폼의 보관함을 캡쳐해서 가져올 수 있습니다.</div>
              <div css={css`color: var(--text-color-4);`}>더 정확한 개인 맞춤형 추천이 가능해집니다. 
              <span css={showMoreDetailCSS}>
                자세히
                {/* <Portal selector=".overlay-root"> */}
                  {descDetail}
                {/* </Portal> */}
              </span>
              </div>
            </div>
            
            </div>
            <div css={bodyCSS}>
              
            
            

            <form method="post" encType="multipart/form-data">
                <div css={altInputCSS}>
                <div css={altInputPathCSS}>{inputRef?.current?.files ? inputRef?.current?.files[0]?.name : '이미지를 첨부해 주세요.'}</div>
            
                        <label css={altInputButtonCSS} className="button" htmlFor="chooseFile">
                            파일 선택
                        </label>
        
                </div>
                
                <input ref={inputRef} css={css`display: none;`} type="file" id="chooseFile" name="chooseFile" accept="image/*" onChange={onClickImageChange} />
            </form>
            
            
            <div css={radioButtonSectorCSS}>
                스캔하려는 작품의 종류를 선택해 주세요!

                <div css={radioButtonInnerSectorCSS}>


  
                    

                    



                  <div css={radioButtonWrapperCSS({targetType: 0, currentType: contentType})} onClick={() => {setContentType(() => 0)}}>
                    {contentType === 0 ? <MdCookie css={iconCSS} size={36} /> : <MdOutlineCookie css={iconCSS} size={36} />}
                    
                    
                      {/* <UseAnimations key={`webtoon-${contentType}`} animation={radioButton} reverse={contentType === 0 ? true : false} size={28} /> */}
                    웹툰
                  </div>
                  <div css={radioButtonWrapperCSS({targetType: 1, currentType: contentType})} onClick={() => {setContentType(() => 1)}}>
                    {contentType === 1 ? <RiBookReadFill css={iconCSS} size={36} /> : <RiBookReadLine css={iconCSS} size={36} />}

                    {/* <UseAnimations key={`novel-${contentType}`} animation={radioButton} reverse={contentType === 1 ? true : false}  size={28} /> */}
                    웹소설
                  </div>
                </div>
                
            </div>
            
            </div>
        </div>
        {/* <div css={css`border-bottom: 1px solid var(--border-color-2); margin-bottom: 16px;`}/> */}
        <div css={footerCSS}>
            <Button width={'47.5%'} height={'48px'} onClick={() => {modalHandler(); phaseHandler(4);}} cancelTheme={true}>취소</Button>
            <Button width={'47.5%'} height={'48px'} onClick={() => {onClickSubmitHandler({image, contentType})}}>제출</Button>
        </div>
      </>
    )
}




const footerCSS = css`
  display: flex;
  justify-content: space-between;;
  padding: 16px 16px 16px 16px;
  border-top: 1px solid var(--border-color-2);
  background-color: var(--back-color-2);
`

const radioButtonSectorCSS = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 160px;
  border-radius: 10px;
  /* border: 1px solid var(--border-color); */
  padding: 24px 0px 16px 0px;
  overflow: hidden;
  background-color: var(--back-color);
`

const radioButtonInnerSectorCSS = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  overflow: hidden;
`

const radioButtonWrapperCSS = ({targetType, currentType}: {targetType: number; currentType: number;}) => {
  return css`
    display: flex;
    align-items: center;
    border-radius: 10px;
    width: 45%;
    height: 84px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${targetType === currentType ? `var(--main-color)` : `var(--border-color-2)`};
    cursor: pointer;
  `
} 

const headerCSS = css`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--back-color);
  border-bottom: 1px solid var(--border-color-2);
  padding-top: 20px;
`

const headerTitleCSS = css`
  font-size: 24px;
  font-weight: 500;
`

const headerIconCSS = css`
  width: 36px;
  height: 36px;
  margin-bottom: 16px;
`

const bodyCSS = css`
  padding: 16px;
`

const altInputCSS = css`
  width: 100%;
  height: 48px;
  border-radius: 10px;
  /* border: 1px solid var(--border-color); */
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left: 8px;
  overflow: hidden;
  margin-bottom: 16px;
  background-color: var(--back-color);
`

const altInputPathCSS = css`
  flex: 1;
  overflow:hidden;
  text-overflow:ellipsis;
  padding-right: 8px;
`

const altInputButtonCSS = css`
  transition-property: background-color;
  transition-duration: 0.3s;
  height: 100%;
  width: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--border-color-2);
  cursor: pointer;
  &:hover {
    background-color: var(--border-color);
  }
`

const iconCSS = css`
  margin-bottom: 6px;
`

const descWrapperCSS = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`

const showMoreDetailCSS = css`
  margin-left: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  &:hover .detail-backdrop {
    opacity: 100%;
  }
`
const backdropCSS = css`
  z-index: 999999;
  width: 100vw;
  height: 100vh;
  position: fixed;
  transition-property: opacity;
  transition-duration: 0.3s;
  opacity: 0%;
  pointer-events: none;
  /* background-color: black; */
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;

`

const descDetailWrapperCSS = css`
  width: 360px;
  height: 620px;
  background-color: var(--back-color);
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  border-radius: 10px;;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  padding: 20px;
`

const exampleImgCSS = css`
  height: auto;
  width: 100%;
  border-radius: 10px;

`

const descStringWrapperCSS = css`
  margin-top: 20px;
  
`
export default FloatingButtonModalSubmitForm