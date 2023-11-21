import { CDN_ENDPOINT } from "../../constants/ENDPOINTS";

interface CurrentComponentProp {
  club_image: string;
}

const Club_rolodex_image = (props: CurrentComponentProp) => {
  const { club_image } = props;

  return (
    <div>
      {club_image !== "/assets/profilePic/clubs/undefined" &&
      club_image !== "/assets/profilePic/clubs/default.jpg" &&
      club_image !== "/assets/profilePic/clubs/" ? (
        <img src={`${CDN_ENDPOINT}${club_image}`} className="h-[200px]" />
      ) : null}
    </div>
  );
};

export default Club_rolodex_image;
