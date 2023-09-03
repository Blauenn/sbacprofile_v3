import { CDN_ENDPOINT } from "../../../constants/ENDPOINTS";
import { defaultImage } from "../../../constants/Misc.constant";

interface CurrentComponentProp {
  image: string;
}

const RolodexCard_image = (props: CurrentComponentProp) => {
  const { image } = props;

  return (
    <div className="w-4/6 h-auto rounded-full">
      <img
        src={`${CDN_ENDPOINT}${image}`}
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
