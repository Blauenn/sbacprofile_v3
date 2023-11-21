import { useState } from "react";
import { FileIcon } from "react-file-icon";
import { handle_file_input_change } from "../../functions/fields/handleFieldChanges.function";

interface CurrentComponentProp {
  file: any;
  setFile: any;
  fileName: string;
  setFileName: any;
  fileLabel: string;
  fileSizeNoticeMessage: string;
}

const Custom_FileFields = (props: CurrentComponentProp) => {
  const {
    file,
    setFile,
    fileName,
    setFileName,
    fileLabel,
    fileSizeNoticeMessage,
  } = props;

  const [fileSizeNotice, setFileSizeNotice] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="border border-opacity-25 border-standardBlack hover:border-opacity-100 rounded-xl w-full h-[100px]">
        <label htmlFor="attached_file">
          {file ? (
            <>
              <div className="flex flex-row justify-center items-center gap-4 w-full h-full px-8 cursor-pointer">
                <div className="w-[50px]">
                  <FileIcon
                    extension={fileName.split(".").pop()}
                    color="pink"
                  />
                </div>
                <h1 className="text-xl truncate">{file.name}</h1>
              </div>
              <input
                type="file"
                name="attached_file"
                id="attached_file"
                hidden
                onChange={(event) => {
                  handle_file_input_change(
                    'input[name="attached_file"]',
                    event,
                    setFile,
                    setFileName,
                    setFileSizeNotice
                  );
                }}
              />
            </>
          ) : (
            <>
              <div className="flex flex-row justify-center items-center gap-4 w-full h-full opacity-75">
                <i className="fa-solid fa-folder text-4xl"></i>
                <h1 className="text-xl">{fileLabel}</h1>
              </div>
              <input
                type="file"
                name="attached_file"
                id="attached_file"
                hidden
                onChange={(event) => {
                  handle_file_input_change(
                    'input[name="attached_file"]',
                    event,
                    setFile,
                    setFileName,
                    setFileSizeNotice
                  );
                }}
              />
            </>
          )}
        </label>
      </div>
      {fileSizeNotice && (
        <h1 className="text-sm text-red-500 mb-2">{fileSizeNoticeMessage}</h1>
      )}
    </div>
  );
};

export default Custom_FileFields;
