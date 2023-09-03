import RolodexCard_contactButton from "./RolodexCard_contactButton.component";

interface CurrentComponentProp {
  object: any;
}

const RolodexCard_contacts = (props: CurrentComponentProp) => {
  const { object } = props;

  return (
    <div className="flex justify-around gap-4">
      <>
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
      </>
    </div>
  );
};

export default RolodexCard_contacts;
