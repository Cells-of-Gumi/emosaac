import MyPage from "@/components/mypage/MyPage";

export default function mypage({ myInfo }: any) {
  return (
    <>
      <MyPage myinfo={myInfo} />
    </>
  );
}
