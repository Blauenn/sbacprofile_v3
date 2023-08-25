const PageHeader = (props: any) => {
  const { icon, text } = props;

  return (
    <div className="flex flex-row justify-between items-center mb-8">
      <h1 className="text-3xl lg:text-4xl | font-semibold">
        <i className={`hidden sm:inline-block | ${icon} me-4`}></i>
        {text}
      </h1>
    </div>
  );
};

export default PageHeader;
