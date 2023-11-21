import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RequestForm } from "../../../../interfaces/common.interface";
import RequestForms_table_row from "./RequestForms_table_row.component";
import {
  table_content_style,
  table_header_style,
  table_parent_style,
} from "../../../../constants/styles/tables.style";

interface CurrentComponentProp {
  requestForms: RequestForm[];
}

const RequestForms_table = (props: CurrentComponentProp) => {
  const { requestForms } = props;

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <table className={table_parent_style}>
      <thead>
        <tr>
          <th className={`${table_header_style}`}>#</th>
          <th className={`${table_header_style} | hidden lg:table-cell`}>
            {t("RequestForms_table_header_submitDate")}
          </th>
          <th className={`${table_header_style} | hidden md:table-cell`}>
            {t("RequestForms_table_header_title")}
          </th>
          <th className={`${table_header_style} | hidden sm:table-cell`}>
            {t("RequestForms_table_header_status")}
          </th>
          <th className={`${table_header_style}`}>
            <i className="fa-solid fa-pencil"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        {requestForms.length > 0 ? (
          requestForms.map((requestForm: RequestForm, index: number) => (
            <React.Fragment key={requestForm.request_form_ID}>
              <RequestForms_table_row
                requestForm={requestForm}
                index={requestForms.length - index}
              />
            </React.Fragment>
          ))
        ) : (
          <td className={table_content_style}>
            {isLoading ? (
              <>
                <i className="fa-solid fa-spinner animate-spin me-2"></i>
                {t("Loading_message")}
              </>
            ) : (
              t("RequestForms_table_noRequestForms_message")
            )}
          </td>
        )}
      </tbody>
    </table>
  );
};

export default RequestForms_table;
