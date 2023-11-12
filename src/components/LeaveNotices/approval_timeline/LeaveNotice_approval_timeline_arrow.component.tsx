interface CurrentComponentProp {
  status: number;
}

const LeaveNotice_approval_timeline_arrow = (props: CurrentComponentProp) => {
  const { status } = props;

  let iconColor;
  switch (status) {
    case 2:
      iconColor = "text-green-500";
      break;
    case 3:
      iconColor = "text-yellow-500";
      break;
    case 4:
      iconColor = "text-red-500";
      break;
    default:
      iconColor = "text-gray-500 opacity-50";
      break;
  }

  return (
    <div className="hidden md:flex | relative flex-col justify-center">
      <i
        className={`absolute top-1/4 fa-solid fa-arrow-right | text-xl sm:text-3xl ${iconColor}`}></i>
    </div>
  );
};

export default LeaveNotice_approval_timeline_arrow;
