/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonMain from "../../components/button/ButtonMain";
import FormInputTextField from "../../components/form_components/FormInputTextField";

const schema = yup.object({
  username: yup.string().min(6, "username must be at least 6 characters"),
  email: yup.string().required("Please enter your email").email("Please enter valid email address"),
});
function UserInfo() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "ngoctu280801",
      name: "",
      email: "ngoctu.280801@gmail.com",
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = formValues => {
    //do sth
    console.log(formValues);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 rounded-md w-2/4 bg-white shadow-[rgb(0_0_0_/_15%)_0px_2px_4px_0px]"
    >
      <div className="flex justify-between border-gray-500 border-b-2 pb-4">
        <h2 className="font-bold text-xl">User information</h2>
        <ButtonMain type="submit" className="bg-green-700 hover:bg-green-800">
          Save
        </ButtonMain>
      </div>
      <div className="flex gap-4 mt-4">
        <div className="w-[185px] h-[136px] bg-blue-400 rounded-lg" />
        <div className="flex flex-col gap-5 w-full">
          <FormInputTextField
            name="username"
            fullWidth
            label="Username"
            placeholder="Enter your username"
            type="text"
            control={control}
            error={errors?.username != null}
            helperText={errors?.username && errors.username.message}
          />
          <FormInputTextField
            name="name"
            fullWidth
            placeholder="Enter your fullname"
            type="text"
            label="Name"
            control={control}
          />
          <FormInputTextField
            name="email"
            fullWidth
            placeholder="Enter your email address"
            type="email"
            label="Email address"
            control={control}
            error={errors?.email != null}
            helperText={errors?.email && errors.email.message}
          />
        </div>
      </div>
    </form>
  );
}

export default UserInfo;
