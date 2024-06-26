import { Link, Outlet } from "react-router-dom";
import NavMenu from "./NavMenu";
import UserMenu from "./UserMenu";
import AskBtn from "../AskBtn";

const Header = () => {
  return (
    <>
      <nav className="absolute flex-col w-full min-w-[823px] bg-white items-center">
        <div className="justify-center flex top-0 h-[179px] items-end pb-[10px] w-full">
          <div className="flex gap-[30px] flex-grow-[0.3] items-center">
            <Link to={"/"}>
              <h1 className="logo text-[32px] text-main-color">아이맘투어</h1>
            </Link>
          </div>
          <UserMenu />
        </div>
        <NavMenu />
      </nav>
      <Outlet />
      <AskBtn />
    </>
  );
};
export default Header;
