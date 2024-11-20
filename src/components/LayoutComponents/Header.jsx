import { LuBell } from "react-icons/lu";
import profilee from "../../../src/assets/header/profileLogo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-[#050505] text-white ">
      <div className="flex justify-between">
        <div>

        </div>
      <div className="flex gap-8 p-6">
        <div className="w-[45px] h-[45px] flex items-center justify-center text-xl rounded-full bg-white text-black ">
        <LuBell />
        </div>
        <Link to={'/dashboard/Settings/profile'}>
        <div className="flex gap-3">
          <div>
            <img className="w-[45px] h-[45px]" src={profilee} alt="profile" />
          </div>
          <div className="text-end">
            <h3>Jony Toms</h3>
            <h4 className="text-sm">Admin</h4>
          </div>
        </div></Link>
      </div>
      </div>
    </div>
  );
};

export default Header;
