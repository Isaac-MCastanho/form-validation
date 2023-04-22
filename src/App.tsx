import "./styles/global.css";
import banner from "./assets/img/banner3.svg";
import { RiDeleteBin6Line } from "react-icons/ri";

import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { supabase } from "./lib/supabase";
import { Form } from "./components/Form";
import { createUserFormSchema, CreateUserFormData } from "./lib/zodUserForm";

function App() {
  const createUserForm = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = createUserForm;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "techs",
  });

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
  }

  return (
    <main className="max-sm:px-6 pb-6  min-h-screen h-max bg-zinc-900 text-zinc-300 flex flex-col gap-10 items-center justify-center">
      <FormProvider {...createUserForm}>
        <img className="max-w-xs" src={banner} alt="" />
        <form
          onSubmit={handleSubmit(createUser)}
          className="flex flex-col gap-4 w-full max-w-md"
        >
          <Form.Field>
            <Form.InputFile label="avatar" name="avatar" />
            <Form.ErrorMessage field="avatar" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="name">Nome</Form.Label>
            <Form.Input name="name" type="text" id="name" />

            <Form.ErrorMessage field="name" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="email">E-mail</Form.Label>
            <input
              id="email"
              type="email"
              className="border border-zinc-700 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white"
              {...register("email")}
            />

            <Form.ErrorMessage field="email" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="password">Senha</Form.Label>
            <input
              id="password"
              type="password"
              className="border border-zinc-700 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white"
              {...register("password")}
            />
            <Form.ErrorMessage field="password" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="">
              Tecnologias
              <button
                type="button"
                onClick={addNewTech}
                className="text-emerald-500 text-sm"
              >
                Adicionar
              </button>
            </Form.Label>

            {fields.map((field, index) => {
              const fieldName = `techs.${index}.title`;
              const fieldKnowledge = `techs.${index}.knowledge`;
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
                        <Form.ErrorMessage field={fieldName} />
                      )}
                    {errors?.techs?.length! >= 2 &&
                      !errors.techs?.[index]?.title &&
                      errors.techs?.[index]?.knowledge && (
                        <Form.ErrorMessage field={fieldKnowledge} />
                      )}
                  </div>
                </div>
              );
            })}
            <Form.ErrorMessage field="techs" />
          </Form.Field>

          <button
            type="submit"
            className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600"
          >
            Enviar
          </button>
        </form>
      </FormProvider>
    </main>
  );
}

export default App;
