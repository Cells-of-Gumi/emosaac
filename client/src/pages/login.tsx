import OauthLogin from "@/components/login/OauthLogin";

interface LoginProps {
  isDarkMode: boolean;
}
export default function login({ isDarkMode }: LoginProps) {
  return (
    <>
      <OauthLogin isDarkMode={isDarkMode} />
    </>
  );
}
