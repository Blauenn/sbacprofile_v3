interface CurrentComponentProp {
  message: string;
  isSuccess: boolean;
}

const Info_addSuccess_message = (props: CurrentComponentProp) => {
  const { message, isSuccess } = props;

  return (
    <>
      {isSuccess ? (
        <div className="flex items-center w-full h-full">
          <h1 className="text-xl">
            <i className="fa-solid fa-circle-check text-2xl text-green-500 me-2"></i>
            {message}
          </h1>
        </div>
      ) : null}
    </>
  );
};

export default Info_addSuccess_message;
