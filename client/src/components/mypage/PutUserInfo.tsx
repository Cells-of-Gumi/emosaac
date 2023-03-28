/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { getToken } from "@/api/instance";
import getIsNickname from "@/api/user/getIsNickname";
import { putMyInfo } from "@/api/user/putMyInfo";
import { useState } from "react";
import { useEffect } from "react";
const PutUserInfo = () => {
  const defaultProfileImage = "/assets/default_image.png";
  const token = getToken();
  const [nickname, setNickname] = useState("");
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false);
  const [nicknameValidityMessage, setNicknameValidityMessage] = useState("");

  const [gender, setGender] = useState<number | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [image, setImage] = useState<string | undefined>("");
  const onClickProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setProfileImage(event.target.files[0]);
    }
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    if (profileImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(profileImage);
    }
  }, [profileImage]);
  const onClickGender = (newGender: number) => {
    setGender(newGender);
  };
  const onclickAge = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAge(Number(event.target.value));
  };
  const onClickSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (nickname && gender !== null && age !== null) {
      const myInfo = {
        file: profileImage,
        gender,
        age,
        nickName: nickname,
      };
      try {
        const response = await putMyInfo(myInfo);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("모든 필수 입력 항목을 입력해주세요.");
    }
  };
  const handleNicknameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
    console.log(nickname);
  };

  const onClickCheckDuplicateNickname = () => {
    getIsNickname(nickname, token).then((res) => {
      console.log(res);
      if (res === false) {
        setNicknameValidityMessage("사용 가능한 닉네임이에요");
      } else {
        setNicknameValidityMessage("사용이 불가능한 닉네임이에요");
      }
    });
  };
  return (
    <>
      <section>
        <form action="" css={formCSS} onSubmit={onClickSubmit}>
          <article css={textwrapCSS}>
            <h2>회원정보수정</h2>
          </article>
          <div>
            <div css={imagewrapCSS}>
              <label htmlFor="profileImage">
                <img
                  css={imageCSS}
                  src={image || defaultProfileImage}
                  alt="프로필 이미지"
                />
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>
            </div>
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={onClickProfileImageChange}
            />
          </div>
          <div css={nicknamewrapCSS}>
            <label htmlFor="">
              <h3>닉네임</h3>
            </label>
            <input
              css={inputwrapCSS}
              type="text"
              placeholder="닉네임을 입력해주세요"
              value={nickname}
              onChange={handleNicknameInput}
            />
            <button
              css={nicknameconfirmCSS}
              onClick={onClickCheckDuplicateNickname}
              type="button"
            >
              중복확인
            </button>
          </div>
          {!isNicknameDuplicate ? (
            <div>{nicknameValidityMessage}</div>
          ) : (
            <div>{nicknameValidityMessage}</div>
          )}
          <div css={genderwrapCSS}>
            <h3 css={genderCSS}>성별</h3>
            <button onClick={() => onClickGender(1)} css={genderbuttonCSS}>
              남성
            </button>
            <button onClick={() => onClickGender(2)} css={genderbuttonCSS}>
              여성
            </button>
          </div>
          <div>
            <div css={agewrapCSS}>
              <h3 css={ageCSS}>연령대</h3>
              <div css={explainCSS}>연령대에 맞게 추천을 해드려요!</div>
            </div>
            <select css={selectCSS} onChange={onclickAge}>
              <option value="">연령대를 선택해주세요</option>
              <option value="10">10대</option>
              <option value="20">20대</option>
              <option value="30">30대</option>
              <option value="40">40대</option>
              <option value="50">50대</option>
              <option value="60">60대 이상</option>
            </select>
          </div>
          <button type="submit" css={submitCSS}>
            정보 수정
          </button>
        </form>
      </section>
    </>
  );
};

const formCSS = css`
  color: var(--text-color);
  display: flex;
  height: 580px;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  padding: 10px;
  border-radius: 5px;
  margin: 50px auto;
  border: 1px solid var(--border-color);
`;
const textwrapCSS = css`
  text-align: left;
  margin-bottom: 40px;
`;

const nicknamewrapCSS = css`
  position: relative;
  margin-top: 30px;
`;
const nicknameconfirmCSS = css`
  position: absolute;
  cursor: pointer;
  color: var(--main-color);
  border: 1px solid var(--border-color);
  background-color: var(--back-color);
  border-radius: 5px;
  padding: 3px 3px;
  /* color :  */
  bottom: 5px;
  right: 0px;
`;
const imagewrapCSS = css`
  width: 150px;
  height: 150px;
  /* img태그 위에 auto를 주어야 바뀜 */
  margin: 0 auto;
`;
const imageCSS = css`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  cursor: pointer;
`;
const inputwrapCSS = css`
  border: none;
  border-bottom: 3px solid var(--main-color);
  margin-top: 10px;
  width: 100%;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: var(--text-color);
    font-weight: bold;
  }
  background-color: var(--back-color);
  color: var(--text-color);
`;

const selectCSS = css`
  margin-top: 10px;
  border-radius: 5px;
`;

const genderwrapCSS = css`
  margin-top: 20px;
`;

const genderCSS = css`
  border: none;
  border-bottom: 3px solid var(--main-color);
  padding-bottom: 1px;
`;
const genderbuttonCSS = css`
  cursor: pointer;
  margin-top: 5px;
  margin-right: 3px;
`;
const agewrapCSS = css`
  margin-top: 20px;
`;

const ageCSS = css`
  border: none;
  border-bottom: 3px solid var(--main-color);
  padding-bottom: 1px;
`;

const explainCSS = css`
  margin-left: 2px;
  margin-top: 5px;
  font-size: 10px;
`;

const submitCSS = css`
  cursor: pointer;
`;
export default PutUserInfo;
