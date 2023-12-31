import { CDN_ENDPOINT } from "../../constants/ENDPOINTS";
import { handle_image_change } from "../../functions/fields/handleFieldChanges.function";
import { Major_To_Background_Color } from "../../constants/Majors.constant";
import { Default_Image } from "../../constants/Misc.constant";

const ImageField_profile_image_styles =
  "flex justify-center items-center border border-opacity-25 border-standardBlack w-[120px] h-[120px] sm:w-[300px] sm:h-[300px] | rounded-full overflow-hidden";

// For students and teachers CRUD //
interface ImageFieldProfileProps {
  imageObject: any;
  fieldName: string;
  profile_image?: string;
  profile_major?: number;
  imagePreview: string;
  setImagePreview: any;
  setImage: any;
  setFileSizeNotice: any;
}
export const ImageField_profile = (props: ImageFieldProfileProps) => {
  const {
    imageObject,
    fieldName,
    profile_image,
    profile_major,
    imagePreview,
    setImagePreview,
    setImage,
    setFileSizeNotice,
  } = props;

  return (
    <>
      {imageObject ? (
        <div className={`${ImageField_profile_image_styles} bg-primary`}>
          <img src={imagePreview || ""} />
        </div>
      ) : profile_image && profile_major ? (
        <div
          className={`${ImageField_profile_image_styles} ${Major_To_Background_Color[profile_major]}`}>
          <img
            src={`${CDN_ENDPOINT}${profile_image}`}
            onError={(e) => {
              e.currentTarget.src = Default_Image;
            }}
          />
        </div>
      ) : (
        <div className={`${ImageField_profile_image_styles}`}>
          <i className="fa-solid fa-image text-4xl sm:text-6xl opacity-50"></i>
        </div>
      )}
      <input
        name={fieldName}
        id={fieldName}
        type="file"
        accept=".jpg, .jpeg, .png"
        hidden
        onChange={(event) => {
          handle_image_change(
            event,
            setImagePreview,
            setImage,
            setFileSizeNotice
          );
        }}
      />
    </>
  );
};
