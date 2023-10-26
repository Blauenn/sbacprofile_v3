import { NavLink } from "react-router-dom";
import { hover_transition } from "../../../constants/styles/transitions.style";

interface CurrentComponentProp {
  url: string;
  color: string;
  icon: string;
  title: string;
  description: string;
  badgeContent?: string;
}

const Dashboard_button = (props: CurrentComponentProp) => {
  const { url, color, icon, title, description, badgeContent } = props;

  return (
    <div>
      <NavLink to={url}>
        <div
          className={`relative flex flex-row justify-between h-full shadow-sm rounded-xl px-4 py-2 | bg-white hover:bg-slate-200 cursor-pointer ${hover_transition}`}>
          <div>
            <h1 className="text-xl font-semibold">
              <i className={`${icon} me-4 ${color}`}></i>
              {/* If it does not overflow */}
              <b className="font-semibold md:hidden 2xl:inline-block">
                {title}
              </b>
              {/* If it overflows */}
              <b className="font-semibold hidden md:inline-block 2xl:hidden">
                {title.length > 8 ? `${title.substring(0, 8)}...` : title}
              </b>
            </h1>
            <h1 className="text-lg opacity-50">{description}</h1>
          </div>
          {/* Badge */}
          {badgeContent ? (
            <div className="absolute -right-2 -top-2">
              <div className="flex justify-center items-center w-[30px] h-[30px] bg-red-500 rounded-full">
                <h1 className="text-white">{badgeContent}</h1>
              </div>
            </div>
          ) : null}
        </div>
      </NavLink>
    </div>
  );
};

export default Dashboard_button;
