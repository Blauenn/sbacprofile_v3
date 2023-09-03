import { CDN_ENDPOINT } from "../../../constants/ENDPOINTS";
import { defaultImage } from "../../../constants/Misc.constant";

interface CurrentComponentProp {
  image: string;
}

const RolodexModal_image = (props: CurrentComponentProp) => {
  const { image } = props;

  return (
    <img
      src={`${CDN_ENDPOINT}${image}`}
      onError={(e) => {
        e.currentTarget.src = defaultImage;
      }}
      className="max-w-[500px] max-h-[500px] w-5/6 sm:w-4/6 lg:w-5/6 | rounded-full"
    />
  );
};

export default RolodexModal_image;
