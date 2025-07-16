import React from "react";
import Input from "./Input";
import FileUpload from "./FIleUpload";
import Dropdown from "./Dropdown";
import Toggle from "./Toggle";

const DynamicForm = ({ options }) => {
  if (!Array.isArray(options) || options.length === 0) return null;

  const renderField = (field) => {
    switch (field.formType) {
      case "input":
        return <Input {...field} />;
      case "file":
        return <FileUpload {...field} handleUpload={field.onChange} />;
      case "dropdown":
        return <Dropdown {...field} />;
      case "toggle":
        return <Toggle {...field} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full  flex flex-col items-center justify-center gap-6 divide-y divide-border">
      {options.map((section, sectionIdx) => {
        const hasMeta = section.title || section.desc;

        return (
          <div
            key={sectionIdx}
            className="w-full  flex flex-col md:flex-row items-start justify-between gap-4 pb-4"
          >
            {hasMeta && (
              <div className="w-full md:w-1/2 flex flex-col items-start justify-center ">
                {section.title && (
                  <h2 className="text-xl md:text-2xl font-semibold">
                    {section.title}
                  </h2>
                )}
                {section.desc && (
                  <p className="text-sm md:text-base text-dark/75">
                    {section.desc}
                  </p>
                )}
              </div>
            )}

            <div
              className={`${
                hasMeta ? "w-full md:w-1/2" : "w-full"
              } flex flex-col gap-4`}
            >
              {section.fields.map((field, fieldIdx) => (
                <React.Fragment key={fieldIdx}>
                  {renderField(field)}
                </React.Fragment>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DynamicForm;
