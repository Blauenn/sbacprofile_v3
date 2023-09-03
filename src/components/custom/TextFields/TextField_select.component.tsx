import { TextField } from "@mui/material";
import { handleInputChange } from "../../../functions/fields/handleFieldChanges.function";

interface CurrentComponentProp {
  label: string;
  name: string;
  className: string;
  object: any;
  setObject: any;
  value: any;
  validation: string;
  children: React.ReactNode;
}

const TextField_select = (props: CurrentComponentProp) => {
  const {
    label,
    name,
    className,
    object,
    setObject,
    value,
    validation,
    children,
  } = props;

  return (
    <div className="flex flex-col gap-1">
      <TextField
        label={label}
        name={name}
        className={className}
        onChange={(event) => {
          handleInputChange(event, object, setObject);
        }}
        select
        SelectProps={{ native: true }}
        value={value}
        error={validation !== ""}>
        {children}
      </TextField>
      {validation !== "" ? (
        <h1 className="text-sm text-red-500">{validation}</h1>
      ) : null}
    </div>
  );
};

export default TextField_select;
