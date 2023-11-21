import { Tooltip } from "@mui/material";
import { CDN_ENDPOINT } from "../../constants/ENDPOINTS";
import { Major_To_Background_Color } from "../../constants/Majors.constant";
import { Default_Image } from "../../constants/Misc.constant";

interface CurrentComponentProp {
  title?: string;
  imageURL?: string;
  profileMajor: number;
}

const Club_rolodex_avatar = (props: CurrentComponentProp) => {
  const { title, imageURL, profileMajor } = props;

  return (
    <Tooltip title={title} placement="bottom" arrow>
      <div
        className={`${Major_To_Background_Color[profileMajor]} w-[40px] h-[40px] rounded-full overflow-hidden`}>
        <img
          src={`${CDN_ENDPOINT}${imageURL}`}
          className="flex-shrink-0 shadow-sm"
          onError={(e) => {
            e.currentTarget.src = Default_Image;
          }}
        />
      </div>
    </Tooltip>
  );
};

export default Club_rolodex_avatar;
