/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRouter } from "next/router";

const write = () => {
  return (
    <div>
      <div>
        <div>emo.PICK 작성하기</div>
      </div>
      <div>
        <form action="submit">
          <div>
            <h3>제목</h3>
            <input type="text" id="title" />
          </div>
          <div>
            <h3>내용</h3>
            <textarea
              name="content"
              id="content"
              cols={30}
              rows={10}
            ></textarea>
          </div>
          <div>
            <h3>추천</h3>
            <div>여기는 검색창</div>
            <div>여기는 스크롤</div>
          </div>
          <button id="submit_button">제출</button>
        </form>
      </div>
    </div>
  );
};

export default write;
