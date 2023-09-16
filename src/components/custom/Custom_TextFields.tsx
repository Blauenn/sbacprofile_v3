import { TextField } from "@mui/material";
import { handleInputChange } from "../../functions/fields/handleFieldChanges.function";

interface TextFieldTextProp {
  label: string;
  name: string;
  className: string;
  object: any;
  setObject: any;
  value?: any;
  validation: string;
}

interface TextFieldSelectProp {
  disabled?: boolean
  label: string;
  name: string;
  className: string;
  object: any;
  setObject: any;
  value?: any;
  validation: string;
  children: React.ReactNode;
}

interface TextFieldMultiline {
  label: string;
  name: string;
  className: string;
  object: any;
  setObject: any;
  maxRows: number;
  value?: any;
  validation: string;
}

export const TextField_text = (props: TextFieldTextProp) => {
  const { label, name, className, object, setObject, value, validation } =
    props;

  return (
    <div className="flex flex-col gap-1">
      <TextField
        label={label}
        name={name}
        className={className}
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

export const TextField_select = (props: TextFieldSelectProp) => {
  const {
    label,
    name,
    className,
    object,
    setObject,
    value,
    validation,
    disabled,
    children,
  } = props;

  return (
    <div className="flex flex-col gap-1">
      <TextField
        disabled={disabled}
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

export const TextField_multiline = (props: TextFieldMultiline) => {
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
        maxRows={maxRows ?? 1}
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
