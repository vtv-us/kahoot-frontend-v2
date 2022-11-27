/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonMain from "../../components/button/ButtonMain";
import FormInputTextField from "../../components/form_components/FormInputTextField";
import ImageUpload from "../../components/image/UploadImage";
import useUploadImage from "../../hooks/useUploadImage";
import { getCurrentUser } from "../../utils/constants";

const schema = yup.object({
  username: yup.string().min(6, "username must be at least 6 characters"),
  email: yup.string().required("Please enter your email").email("Please enter valid email address"),
});
function UserInfo() {
  const user = getCurrentUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      // username: "ngoctu280801",
      name: user?.user?.name,
      email: user?.user?.email,
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = formValues => {
    //do sth
    console.log(formValues);
  };

  const { image, setImage, progress, handleChangeImage, handleDeleteImage } = useUploadImage();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-md w-2/4 bg-white shadow-[rgb(0_0_0_/_15%)_0px_2px_4px_0px] mx-auto"
    >
      <div className="px-5 py-4 flex justify-between border-gray-200 border-b-[1.5px]">
        <h2 className="font-bold text-lg">User information</h2>
        <ButtonMain type="submit" hoverColor="bg-green-800" bgColor="bg-green-700" className=" h-8 w-[96px]">
          Save
        </ButtonMain>
      </div>
      <div className="p-5 flex gap-4 mt-4">
        <div className="w-[185px] h-[185px] mx-auto rounded-full">
          <ImageUpload
            name="image"
            handleChangeImage={handleChangeImage}
            progress={progress}
            image={image}
            className="!rounded-full h-full"
          />
        </div>
        <div className="flex flex-col gap-5 w-full">
          {/* <FormInputTextField
            name="username"
            fullWidth
            label="Username"
            placeholder="Enter your username"
            type="text"
            control={control}
            error={errors?.username != null}
            helperText={errors?.username && errors.username.message}
          /> */}
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
