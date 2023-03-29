/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import Tesseract from 'tesseract.js';
import Test from '../../public/assets/Test.jpg'
import {useRef} from 'react'


export default function Home() {
  const testRef = useRef<HTMLInputElement>(null)
  const recog = () => {
    console.log(testRef)
    // Tesseract.recognize(
    //   'https://t2.daumcdn.net/thumb/R720x0.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/dJcs/image/BhOY6qwqRv1nTbblAhZGgbAs-9Y.png',
    //   'kor',
    //   { logger: m => console.log(m) }
    // ).then(({ data: { text } }) => {
    //   console.log(text);
    // })
  }

  function loadFile(event: any) {
    let file: any = null

      file = event.target.files[0];	//선택된 파일 가져오기


    


  	Tesseract.recognize(
      URL.createObjectURL(file),
        'kor+eng',
        { logger: m => console.log(m) }
      ).then(({ data: { text } }) => {
        console.log(text);
      })



};

  return (
    <div>
      <button onClick={recog}>recog</button>
      <input ref={testRef} type="file" id="chooseFile" name="chooseFile" accept="image/*" onChange={loadFile}></input>

    </div>
  );
}



// 이후 작업들...
