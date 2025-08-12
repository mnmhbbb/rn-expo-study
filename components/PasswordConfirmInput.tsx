import { Controller, useFormContext, useWatch } from "react-hook-form";

import InputField from "@/components/InputField";

const PasswordConfirmInput = () => {
  const { control } = useFormContext();
  const password = useWatch({ control, name: "password" });

  return (
    <Controller
      name="passwordConfirm"
      control={control}
      rules={{
        validate: (value: string) => {
          if (value.length === 0) {
            return "비밀번호를 입력해주세요.";
          }
          if (value !== password) {
            return "비밀번호가 일치하지 않습니다.";
          }
        },
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <InputField
          label="비밀번호 확인"
          placeholder="비밀번호를 입력해주세요."
          secureTextEntry
          value={value}
          onChangeText={onChange}
          error={error?.message}
        />
      )}
    />
  );
};

export default PasswordConfirmInput;
