import { CDN_ENDPOINT } from "../../../constants/ENDPOINTS";
import { defaultImage } from "../../../constants/Misc.constant";

interface CurrentComponentProp {
  image: string;
  majorColor: string;
}

const RolodexModal_image = (props: CurrentComponentProp) => {
  const { image, majorColor } = props;

  return (
    <div
      className={`flex justify-center items-center w-[220px] h-[220px] | ${majorColor} rounded-full overflow-hidden`}>
      <img
        src={`${CDN_ENDPOINT}${image}`}
        onError={(e) => {
          e.currentTarget.src = defaultImage;
        }}
      />
    </div>
  );
};

export default RolodexModal_image;
