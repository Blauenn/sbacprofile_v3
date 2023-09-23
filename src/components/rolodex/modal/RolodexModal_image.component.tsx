import { CDN_ENDPOINT } from "../../../constants/ENDPOINTS";
import { defaultImage } from "../../../constants/Misc.constant";

interface CurrentComponentProp {
  image: string;
  majorColor: string;
}

const RolodexModal_image = (props: CurrentComponentProp) => {
  const { image, majorColor } = props;

  return (
    <div className={`max-w-[500px] max-h-[500px] w-5/6 sm:w-4/6 lg:w-5/6 | ${majorColor} rounded-full overflow-hidden`}>
      <img
        src={`${CDN_ENDPOINT}${image}`}
        onError={(e) => {
          e.currentTarget.src = defaultImage;
        }}
        className="w-full"
      />
    </div>
  );
};

export default RolodexModal_image;
