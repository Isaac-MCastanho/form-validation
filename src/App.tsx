import { ChangeEvent, useState } from "react";
import "./styles/global.css";
import banner from "./assets/img/banner3.svg";
import { RiDeleteBin6Line } from "react-icons/ri";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "./lib/supabase";

const createUserFormSchema = z.object({
  avatar: z
    .instanceof(FileList)
    .transform((list) => list.item(0)!)
    .refine((file) => file != null || undefined, "O arquivo é obrigatorio")
    .refine(
      (file) => file?.size <= 5 * 1024 * 1024,
      "O arquivo precisa ter no máximo 5MB"
    ),
  name: z
    .string()
    .nonempty("O nome é obrigatório")
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  email: z
    .string()
    .nonempty("O e-mail é obrigatorio")
    .email("Formato de e-mail inválido"),
  password: z.string().min(6, "A senha precisa de no mínimo 6 caracteres"),
  techs: z
    .array(
      z.object({
        title: z.string().nonempty("O título é obrigatorio"),
        knowledge: z.coerce
          .number()
          .min(1, "Minimo 1 maximo 100")
          .max(100, "Minimo 1 maximo 100"),
      })
    )
    .min(2, "Insira pelo menos 2 tecnologias"),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

function App() {
  const [output, setOutput] = useState("");
  const [file, setFile] = useState<File>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "techs",
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  function addNewTech() {
    append({ title: "", knowledge: 1 });
  }
  function deleteTech(id: number) {
    remove(id);
  }

  async function createUser(data: CreateUserFormData) {
    await supabase.storage
      .from("form-react")
      .upload(data.avatar?.name, data.avatar);
    setOutput(JSON.stringify(data, null, 2));
  }

  return (
    <main className="max-sm:px-6 pb-6  min-h-screen h-max bg-zinc-900 text-zinc-300 flex flex-col gap-10 items-center justify-center">
      <img className="max-w-xs" src={banner} alt="" />
      <form
        onSubmit={handleSubmit(createUser)}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <div className="flex flex-col gap-1">
          <span>Avatar</span>
          <label
            htmlFor="avatar"
            className="cursor-pointer items-center flex justify-center border border-zinc-700 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white"
          >
            {file ? `${file.name}` : "Escolher Arquivo..."}
          </label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            className="sr-only"
            // className="opacity-0  w-0 h-0"
            {...register("avatar")}
            onChange={handleFileChange}
          />

          {errors.avatar && (
            <span className="text-white bg-red-900 rounded px-2">
              {errors.avatar.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            className="border border-zinc-700 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white"
            {...register("name")}
          />

          {errors.name && (
            <span className="text-white bg-red-900 rounded px-2">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            className="border border-zinc-700 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white"
            {...register("email")}
          />

          {errors.email && (
            <span className="text-white bg-red-900 rounded px-2">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            className="border border-zinc-700 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-white bg-red-900 rounded px-2">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="" className="flex items-center justify-between">
            Tecnologias
            <button
              type="button"
              onClick={addNewTech}
              className="text-emerald-500 text-sm"
            >
              Adicionar
            </button>
          </label>

          {fields.map((field, index) => {
            return (
              <div className="flex gap-2" key={field.id}>
                <button
                  onClick={() => deleteTech(index)}
                  type="button"
                  className="text-red-500 text-lg w-10 max-w-[40px] h-10 max-h-10 rounded border border-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
                >
                  <RiDeleteBin6Line />
                </button>

                <div className="flex-1 flex flex-col gap-1  ">
                  <div className="flex-1 flex gap-1  ">
                    <div className="flex-1 flex flex-col gap-1">
                      <input
                        type="text"
                        className=" border border-zinc-700 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white"
                        {...register(`techs.${index}.title`)}
                      />
                    </div>

                    <div className="flex flex-col gap-1 items-end">
                      <input
                        type="number"
                        className="w-full max-w-[64px] border border-zinc-700 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white"
                        {...register(`techs.${index}.knowledge`)}
                      />
                    </div>
                  </div>
                  {errors?.techs?.length! >= 2 &&
                    errors.techs?.[index]?.title && (
                      <span className="text-white bg-red-900 rounded px-2">
                        {errors.techs?.[index]?.title?.message}
                      </span>
                    )}
                  {errors?.techs?.length! >= 2 &&
                    !errors.techs?.[index]?.title &&
                    errors.techs?.[index]?.knowledge && (
                      <span className="text-white bg-red-900 rounded px-2">
                        {errors.techs?.[index]?.knowledge?.message}
                      </span>
                    )}
                </div>
              </div>
            );
          })}

          {errors.techs && (
            <span className="text-white bg-red-900 rounded px-2">
              {errors.techs.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600"
        >
          Enviar
        </button>
      </form>
    </main>
  );
}

export default App;
