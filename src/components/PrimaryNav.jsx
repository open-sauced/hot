import av1 from "./placeholders/av01.jpg";
import logo from "./logo.svg";
import { useAuth } from "../context/AuthContext";
import { useNetlifyAuth } from "../hooks/useNetlifyAuth";

const PrimaryNav = () => {
  const { login, user } = useNetlifyAuth();

  console.log(login, user);

  return (
    <nav className="flex bg-offWhite min-h-10 w-full font-roboto font-bold px-4 py-4 sm:py-2">
      <div className="flex-1 flex text-2xl font-medium items-center">
        <a href="https://opensauced.pizza">
          <img
            className="h-7 mr-4"
            alt="open
        sauced"
            src={logo}
          />
        </a>
      </div>

      <div className="items-center">
        <div className="rounded-full w-10 h-10 overflow-hidden ring-2 ring-red-800">
          <img className="object-cover w-[500] h-[500]" src={av1} alt="Avatar 02" onClick={() => login("login")} />
        </div>
      </div>
    </nav>
  );
};

export default PrimaryNav;
