import { Textarea } from "@nextui-org/react";

function TextAreaField({ ...props }) {
  return (
    <Textarea
      label={props.label}
      placeholder={props.placeholder || ""}
      {...props}
      radius="sm"
      labelPlacement="outside"
      required={props.isRequired || false}
      classNames={{
        label: "font-medium text-navy-700 dark:text-dark-50 pb-1",
        input: [
          "bg-transparent text-sm font-light",
          "!text-navy-700 dark:!text-dark-50",
          "placeholder:text-sm placeholder:text-slate-400 dark:placeholder:text-dark-100",
        ],
        innerWrapper: "bg-transparent",
        inputWrapper: [
          "p-3 h-auto",
          "!bg-transparent border-2 border-slate-200 dark:border-dark-200 shadow-none",
          "data-[hover=true]:!bg-slate-200/50 dark:data-[hover=true]:!bg-dark-200/50",
          "group-data-[focus=true]:!bg-transparent dark:group-data-[focus=true]:!bg-transparent",
          // 'group-data-[focus=true]:!border-indigo-500',
          "caret-black dark:caret-dark-50 rounded-xl",
        ],
        description: ["text-slate-400 dark:text-dark-100 font-light text-xs"],
      }}
    />
  );
}

export default TextAreaField;
