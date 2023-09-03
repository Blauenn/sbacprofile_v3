interface CurrentComponentProp {
  functionToRun: () => void;
}

const ModalCloseButton = (props: CurrentComponentProp) => {
  const { functionToRun } = props;

  return (
    <button
      onClick={functionToRun}
      className="absolute top-4 right-4 flex justify-center items-center bg-red-600 hover:bg-red-700 rounded-full w-[25px] h-[25px]"></button>
  );
};

export default ModalCloseButton;
