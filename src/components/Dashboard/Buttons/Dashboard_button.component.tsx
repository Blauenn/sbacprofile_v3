import { NavLink } from "react-router-dom";

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
        <div className="h-full border border-standardBlack border-opacity-25 rounded-xl px-4 py-2 | hover:bg-gray-200 cursor-pointer">
          <h1 className="text-xl font-semibold">
            <i className={`${icon} me-4 ${color}`}></i>
            {title}
          </h1>
          <h1 className="text-lg opacity-50">{description}</h1>
        </div>
      </NavLink>
    </div>
  );
};

export default Dashboard_button;
