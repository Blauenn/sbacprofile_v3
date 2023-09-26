import { NavLink } from "react-router-dom";
import { hover_transition } from "../../../constants/styles/transitions.style";

interface CurrentComponentProp {
  url: string;
  color: string;
  icon: string;
  title: string;
  description: string;
}

const Dashboard_button = (props: CurrentComponentProp) => {
  const { url, color, icon, title, description } = props;

  return (
    <div>
      <NavLink to={url}>
        <div
          className={`h-full shadow-sm rounded-xl px-4 py-2 | bg-white hover:bg-slate-200 cursor-pointer ${hover_transition}`}>
          <h1 className="text-xl font-semibold">
            <i className={`${icon} me-4 ${color}`}></i>
            {/* If it does not overflow */}
            <b className="font-semibold md:hidden 2xl:inline-block">{title}</b>
            {/* If it overflows */}
            <b className="font-semibold hidden md:inline-block 2xl:hidden">
              {title.length > 8 ? `${title.substring(0, 8)}...` : title}
            </b>
          </h1>
          <h1 className="text-lg opacity-50">{description}</h1>
        </div>
      </NavLink>
    </div>
  );
};

export default Dashboard_button;
