import { NavLink } from "react-router-dom";

interface CurrentComponentProp {
  text: string;
  subtext?: string;
}

const PageHeaderReturn = (props: CurrentComponentProp) => {
  const { text, subtext } = props;

  return (
    <div className="flex flex-row justify-between items-center mb-8">
      <h1 className="text-3xl lg:text-4xl | font-semibold">
        <NavLink to={"/dashboard"}>
          <i className="fa-solid fa-circle-chevron-left me-4 | opacity-50 hover:opacity-100 transition-all duration-150 ease-in-out"></i>
        </NavLink>
        {text}
      </h1>
      {subtext != "" ? (
        <h1 className="text-3xl opacity-75">{subtext}</h1>
      ) : null}
    </div>
  );
};

export default PageHeaderReturn;
