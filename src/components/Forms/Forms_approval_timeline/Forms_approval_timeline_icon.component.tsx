interface CurrentComponentProp {
  title?: string;
  subtitle?: string;
  icon: string;
  status: number;
}

const Forms_approval_timeline_icon = (props: CurrentComponentProp) => {
  const { title, subtitle, icon, status } = props;

  let borderColor;
  let textColor;
  switch (status) {
    case 2:
      borderColor = "border-green-500";
      textColor = "text-green-500";
      break;
    case 3:
      borderColor = "border-yellow-500";
      textColor = "text-yellow-500";
      break;
    case 4:
      borderColor = "border-red-500";
      textColor = "text-red-500";
      break;
    default:
      borderColor = "border-gray-500 border-opacity-25";
      textColor = "text-gray-500 opacity-50";
      break;
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex justify-center items-center rounded-full mb-2 w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] sm:border-4 ${borderColor}`}>
        <i className={`${icon} text-2xl ${textColor}`}></i>
      </div>
      {title !== "" ? (
        <h1 className={`hidden sm:block text-sm sm:text-base text-center`}>{title}</h1>
      ) : null}
      {subtitle !== "" ? (
        <h1
          className={`hidden sm:block font-semibold text-sm sm:text-base text-center ${textColor}`}>
          {subtitle}
        </h1>
      ) : null}
    </div>
  );
};

export default Forms_approval_timeline_icon;
