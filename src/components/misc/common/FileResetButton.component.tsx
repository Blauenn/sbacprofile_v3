interface CurrentComponentProp {
  functionToRun: () => void;
}

const FileResetButton = (props: CurrentComponentProp) => {
  const { functionToRun } = props;

  return (
    <button
      type="button"
      onClick={functionToRun}
      className="absolute top-4 right-4 flex justify-center items-center bg-red-600 hover:bg-red-700 rounded-full w-[25px] h-[25px]">
      <i className="fa-solid fa-x text-[10px] text-white"></i>
    </button>
  );
};

export default FileResetButton;
