import { TextField } from "@mui/material";
import { handleInputChange } from "../../../functions/fields/handleFieldChanges.function";

interface CurrentComponentProp {
  label: string;
  name: string;
  className: string;
  object: any;
  setObject: any;
  maxRows: number;
  value: any;
  validation: string;
}

const TextField_multiline = (props: CurrentComponentProp) => {
  const {
    label,
    name,
    className,
    object,
    setObject,
    maxRows,
    value,
    validation,
  } = props;

  return (
    <div className="flex flex-col gap-1">
      <TextField
        label={label}
        name={name}
        className={className}
        multiline
        maxRows={maxRows !== null ? maxRows : 1}
        onChange={(event) => {
          handleInputChange(event, object, setObject);
        }}
        value={value}
        error={validation !== ""}
      />
      {validation !== "" ? (
        <h1 className="text-sm text-red-500">{validation}</h1>
      ) : null}
    </div>
  );
};

export default TextField_multiline;
