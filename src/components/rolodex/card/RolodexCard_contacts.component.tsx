import RolodexCard_contactButton from "./RolodexCard_contactButton.component";

const RolodexCard_contacts = (props: any) => {
  const { profile, object } = props;

  if (profile === "student") {
    return (
      <div className="flex justify-around gap-4">
        <>
          <RolodexCard_contactButton
            title={object.student_email}
            major={object.student_major}
            icon="fa-solid fa-at"
          />
          {object.student_phone && (
            <RolodexCard_contactButton
              title={`${object.student_phone.substring(
                0,
                3
              )}-${object.student_phone.substring(
                3,
                6
              )}-${object.student_phone.substring(6)}`}
              major={object.student_major}
              icon="fa-solid fa-phone"
            />
          )}
          {object.student_line_ID && (
            <RolodexCard_contactButton
              title={object.student_line_ID.toLowerCase()}
              major={object.student_major}
              icon="fa-brands fa-line"
            />
          )}
        </>
      </div>
    );
  } else {
    return (
      <div className="flex justify-around gap-4">
        <>
          <RolodexCard_contactButton
            title={object.teacher_email}
            major={object.teacher_major}
            icon="fa-solid fa-at"
          />
          {object.teacher_phone && (
            <RolodexCard_contactButton
              title={`${object.teacher_phone.substring(
                0,
                3
              )}-${object.teacher_phone.substring(
                3,
                6
              )}-${object.teacher_phone.substring(6)}`}
              major={object.teacher_major}
              icon="fa-solid fa-phone"
            />
          )}
          {object.teacher_line_ID && (
            <RolodexCard_contactButton
              title={object.teacher_line_ID.toLowerCase()}
              major={object.teacher_major}
              icon="fa-brands fa-line"
            />
          )}
        </>
      </div>
    );
  }
};

export default RolodexCard_contacts;
