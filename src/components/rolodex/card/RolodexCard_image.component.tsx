import { defaultImage } from "../../../constants/Misc.constant";

const RolodexCard_image = (props: any) => {
  const { image } = props;

  return (
    <div className="w-4/6 h-auto rounded-full">
      <img
        src={`http://cdn.blauenthepeople.com${image}`}
        loading="lazy"
        className="rounded-full w-full h-auto mb-1"
        onError={(e) => {
          e.currentTarget.src = defaultImage;
        }}
      />
    </div>
  );
};

export default RolodexCard_image;
