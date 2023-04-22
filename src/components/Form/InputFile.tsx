import { ChangeEvent, InputHTMLAttributes, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export const InputFile = (props: InputProps) => {
  const [file, setFile] = useState<File>();
  const { register } = useFormContext();
  const inputRef = useRef<HTMLLabelElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const onClickSpan = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <span onClick={onClickSpan} className="capitalize select-none">
        {props.label}
      </span>
      <label
        ref={inputRef}
        htmlFor="avatar"
        className="cursor-pointer items-center flex justify-center border border-zinc-700 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white"
      >
        {file ? `${file.name}` : "Escolher Arquivo..."}
      </label>
      <input
        {...props}
        id={props.name}
        type="file"
        accept="image/*"
        className="sr-only"
        {...register(props.name)}
        onChange={handleFileChange}
      />
    </>
  );
};
