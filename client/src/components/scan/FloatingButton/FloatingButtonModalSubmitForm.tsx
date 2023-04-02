/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import UseAnimations from 'react-useanimations';
// EVERY ANIMATION NEEDS TO BE IMPORTED FIRST -> YOUR BUNDLE WILL INCLUDE ONLY WHAT IT NEEDS
import radioButton from 'react-useanimations/lib/radioButton'

import Button from "@/components/UI/Button/Button";
import { postOcr } from "@/api/ocr/postOcr";

interface FloatingButtonModalSubmitFormProps {
    modalHandler: Function;
    phaseHandler: Function;
    onClickSubmitHandler: Function;
}

const FloatingButtonModalSubmitForm = ({modalHandler, phaseHandler, onClickSubmitHandler}: FloatingButtonModalSubmitFormProps) => {
    const [currentTheme, setCurrentTheme] = useState<any>()
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        const temp = document.documentElement.getAttribute("data-theme")
        setCurrentTheme(() => temp)
        
    }, [])

  const [image, setImage] = useState<File | null>(null);
  const [contentType, setContentType] = useState<0 | 1 | null>(null)

  const onClickImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
      console.log(inputRef)
    }
  };

  

    return(
        <>
            <div>
            <div css={headerCSS}>
            <img css={headerIconCSS} src={currentTheme === 'dark' ? "/assets/scan_icon_white.png" : "/assets/scan_icon.png"}/>
            <div css={headerTitleCSS}>  
                작품 스캔
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
                <div css={radioButtonWrapperCSS} onClick={() => {setContentType(() => 0)}}>
                    
                    <UseAnimations key={`webtoon-${contentType}`} animation={radioButton} reverse={contentType === 0 ? true : false} size={28} />
                    웹툰
                </div>
                <div css={radioButtonWrapperCSS} onClick={() => {setContentType(() => 1)}}>
                    
                    <UseAnimations key={`novel-${contentType}`} animation={radioButton} reverse={contentType === 1 ? true : false}  size={28} />
                    웹소설
                </div>
                </div>
                
            </div>
            
            </div>
        </div>
        <div css={footerCSS}>
            <Button width={'47.5%'} height={'48px'} onClick={modalHandler} cancelTheme={true}>취소</Button>
            <Button width={'47.5%'} height={'48px'} onClick={() => {onClickSubmitHandler({image, contentType})}}>제출</Button>
        </div>
      </>
    )
}




const footerCSS = css`
  display: flex;
  justify-content: space-between;;
  padding: 0px 16px 16px 16px;

`

const radioButtonSectorCSS = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
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

const radioButtonWrapperCSS = css`
  display: flex;
  align-items: center;
`

const headerCSS = css`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--back-color);
  border-bottom: 1px solid var(--border-color-2);
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
  border: 1px solid var(--border-color);
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

export default FloatingButtonModalSubmitForm