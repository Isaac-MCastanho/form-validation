import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const createUserFormSchema = z.object({
  avatar: z
    .instanceof(FileList)
    .transform((list) => list.item(0)!)
    .refine((file) => !!file, "O arquivo é obrigatorio")
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      "O arquivo precisa ter no máximo 5MB"
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Formato de imagem inválido"
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

export type CreateUserFormData = z.infer<typeof createUserFormSchema>;
