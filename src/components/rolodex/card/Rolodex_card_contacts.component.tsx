import RolodexCard_contactButton from "./Rolodex_card_contactButton.component";

interface CurrentObject {
  primary_ID: number;
  ID: number;
  first_name: string;
  last_name: string;
  nickname: string;
  first_name_thai: string;
  last_name_thai: string;
  nickname_thai: string;
  major: number;
  level?: number;
  class?: number;
  phone: string;
  line_ID: string;
  image: string;
  email: string;
  position?: number;
  gender?: number;
}

interface CurrentComponentProp {
  object: CurrentObject;
}

const Rolodex_card_contacts = (props: CurrentComponentProp) => {
  const { object } = props;

  return (
    <div className="flex justify-around gap-4">
      <RolodexCard_contactButton
        title={object.email}
        major={object.major}
        icon="fa-solid fa-at"
      />
      {object.phone && (
        <RolodexCard_contactButton
          title={`${object.phone.substring(0, 3)}-${object.phone.substring(
            3,
            6
          )}-${object.phone.substring(6)}`}
          major={object.major}
          icon="fa-solid fa-phone"
        />
      )}
      {object.line_ID && (
        <RolodexCard_contactButton
          title={object.line_ID.toLowerCase()}
          major={object.major}
          icon="fa-brands fa-line"
        />
      )}
    </div>
  );
};

export default Rolodex_card_contacts;
