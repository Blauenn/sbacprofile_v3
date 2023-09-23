interface CurrentComponentProp {
  icon: string;
  text: string;
  subtext?: string;
}

const PageHeader = (props: CurrentComponentProp) => {
  const { icon, text, subtext } = props;

  return (
    <div className="flex flex-row justify-between items-center mb-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl | font-semibold">
        <i className={`hidden sm:inline-block | ${icon} me-4`}></i>
        {text}
      </h1>
      {subtext != "" ? (
        <h1 className="text-3xl opacity-75">{subtext}</h1>
      ) : null}
    </div>
  );
};

export default PageHeader;
