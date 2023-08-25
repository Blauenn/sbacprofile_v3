import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="flex flex-col justify-center items-center gap-4">
        <i className="fa-solid fa-xmark text-6xl"></i>
        <h1 className="text-2xl">This page does not exist.</h1>
        <h1
          onClick={() => navigate(-1)}
          className="text-lg text-center text-blue-500 hover:text-blue-400 mb-2 cursor-pointer">
          <i className="fa-solid fa-chevron-left me-4"></i>Return
        </h1>
      </div>
    </div>
  );
};

export default PageNotFound;
