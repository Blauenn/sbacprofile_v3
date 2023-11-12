interface CurrentComponentProp {
  title?: string;
  subtitle?: string;
  icon: string;
  status: number;
}

const LeaveNotices_approval_timeline_icon = (props: CurrentComponentProp) => {
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
        className={`flex justify-center items-center bg-white rounded-full mb-2 w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] border-4 sm:border-8 ${borderColor}`}>
        <i className={`${icon} text-xl sm:text-3xl ${textColor}`}></i>
      </div>
      {title !== "" ? (
        <h1 className={`hidden sm:block text-sm sm:text-base`}>{title}</h1>
      ) : null}
      {subtitle !== "" ? (
        <h1
          className={`hidden sm:block font-semibold text-sm sm:text-base ${textColor}`}>
          {subtitle}
        </h1>
      ) : null}
    </div>
  );
};

export default LeaveNotices_approval_timeline_icon;
