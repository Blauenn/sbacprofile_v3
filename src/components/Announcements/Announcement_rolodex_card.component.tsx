import { formatDistanceToNow } from "date-fns";
import { Tooltip } from "@mui/material";
import {
    change_to_date,
    change_to_locale_date,
} from "../../functions/getDates.function";
import { CDN_ENDPOINT } from "../../constants/ENDPOINTS";
import { hover_transition } from "../../constants/styles/transitions.style";

interface CurrentComponentProp {
  announcement: any;
}

const Announcement_rolodex_card = (props: CurrentComponentProp) => {
  const { announcement } = props;

  return (
    <div
      key={announcement.announcement_ID}
      className={`bg-white shadow-sm rounded-xl w-full ${hover_transition} hover:bg-slate-200 cursor-pointer`}>
      <div className="flex flex-col sm:flex-row gap-4 h-full">
        {announcement.announcement_image !== "/assets/files/announcements/" ? (
          <div className={`flex items-center max-w-[300px] h-full`}>
            <img
              src={`${CDN_ENDPOINT}${announcement.announcement_image}`}
              className="border rounded-xl sm:max-w-[320px]"
            />
          </div>
        ) : (
          <div>{/* Empty div for spacing */}</div>
        )}
        <div className="flex flex-col justify-between gap-4 p-4 md:p-8">
          <div className="flex flex-col gap-2 md:gap-4">
            <h1 className="text-2xl md:text-3xl font-semibold">
              {announcement.announcement_title}
            </h1>
            <h1 className="text-lg mx:text-xl line-clamp-2">
              {announcement.announcement_description}
            </h1>
          </div>
          <Tooltip
            title={change_to_locale_date(
              announcement.announcement_create_datetime
            )}
            placement="top-start"
            arrow>
            <h1 className="text-md opacity-50">
              <i className="fa-regular fa-clock me-2"></i>
              {formatDistanceToNow(
                change_to_date(announcement.announcement_create_datetime),
                { addSuffix: true }
              ).replace("about ", "")}
            </h1>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Announcement_rolodex_card;
