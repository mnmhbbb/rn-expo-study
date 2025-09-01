import { Controller, useFormContext } from "react-hook-form";

import InputField from "@/components/InputField";

const TitleInput = () => {
  const { control, setFocus } = useFormContext();

  return (
    <Controller
      name="title"
      control={control}
      rules={{
        validate: (value: string) => {
          if (value.length === 0) {
            return "제목을 입력해주세요.";
          }
        },
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <InputField
          autoFocus
          label="제목"
          placeholder="제목을 입력해주세요."
          inputMode="text"
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => setFocus("description")}
          value={value}
          onChangeText={onChange}
          error={error?.message}
        />
      )}
    />
  );
};

export default TitleInput;
