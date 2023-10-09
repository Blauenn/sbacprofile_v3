import { CDN_ENDPOINT } from "../../../constants/ENDPOINTS";
import { Default_Image } from "../../../constants/Misc.constant";

interface CurrentComponentProp {
  image: string;
  majorColor: string;
}

const RolodexCard_image = (props: CurrentComponentProp) => {
  const { image, majorColor } = props;

  return (
    <div className={`flex justify-center items-center w-[120px] h-[120px] ${majorColor} rounded-full overflow-hidden mb-4`}>
      <img
        src={`${CDN_ENDPOINT}${image}`}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = Default_Image;
        }}
      />
    </div>
  );
};

export default RolodexCard_image;
