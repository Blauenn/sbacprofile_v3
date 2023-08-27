import { defaultImage } from "../../../constants/Misc.constant";

const RolodexModal_image = (props: any) => {
  const { image } = props;

  return (
    <img
      src={`http://cdn.blauenthepeople.com${image}`}
      onError={(e) => {
        e.currentTarget.src = defaultImage;
      }}
      className="max-w-[500px] max-h-[500px] w-5/6 sm:w-4/6 lg:w-5/6 | rounded-full"
    />
  );
};

export default RolodexModal_image;
