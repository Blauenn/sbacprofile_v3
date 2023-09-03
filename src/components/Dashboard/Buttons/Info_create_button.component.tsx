interface CurrentComponentProp {
  text: string;
  icon: string;
  setModalOpen: any;
}

const Info_create_button = (props: CurrentComponentProp) => {
  const { text, icon, setModalOpen } = props;

  return (
    <div className="grid grid-cols-4">
      <button
        onClick={() => {
          setModalOpen(true);
        }}
        className="col-span-4 md:col-span-2 xl:col-span-1 bg-primary text-white rounded-xl px-4 py-2 w-full">
        <i className={`${icon} me-4`}></i>
        {text}
      </button>
    </div>
  );
};

export default Info_create_button;
