import LoginInput from "../components/Login/LoginInput";
import LoginSignUpBtn from "../components/Login/LoginSignUpBtn";
import Button from "../components/common/Button";

const Login = () => {
  return (
    <>
      <div className="centerPosition absolute flex flex-col items-center lg:w-[500px]">
        <div className="w-[170px] h-[50px] bg-main-color mb-[24px]" />
        <LoginInput placeholder={"아이디 (이메일 계정)"} />
        <LoginInput placeholder={"비밀번호"} />
        <LoginSignUpBtn />
        <div className="flex justify-between w-full px-4 my-5 text-xs">
          <div className="flex">
            <button className="mr-4">아이디 찾기</button>
            <button>비밀번호 초기화</button>
          </div>
          <button>회원가입</button>
        </div>
        <div className="bg-main-color w-full h-[1px]" />
        <div className="flex justify-end w-full">
          <button>카카오</button>
          <button>네이버</button>
        </div>
      </div>
      <Button label={"로그인"} />
    </>
  );
};
export default Login;
