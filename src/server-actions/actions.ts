"use server";

import { z } from "zod";

const User = z
  .object({
    username: z.string().min(5).max(10),
    password: z.string().min(8).max(15),
  })
  .required();

export async function loginFormSubmitHandler(formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");
  const validateResult = User.safeParse({ username, password });
  if (!validateResult.success) {
    return validateResult.error.issues;
  }

  try {
    const res = await fetch(
      "https://technical-task-api.icapgroupgmbh.com/api/login/",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      }
    );
    const data = await res.json();
    if (data?.error) {
      throw new Error(data.error);
    }
    return { message: "success" };
  } catch (error) {
    if (error instanceof Error) {
      return { message: "User name or password wrong" };
    }
  }
}
