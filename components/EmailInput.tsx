import { Controller, useFormContext } from "react-hook-form";

import InputField from "@/components/InputField";

const EmailInput = () => {
  const { control } = useFormContext();

  return (
    <Controller
      name="email"
      control={control}
      rules={{
        validate: (value: string) => {
          if (value.length === 0) {
            return "이메일을 입력해주세요.";
          }
          if (!/^[^/s@]+@[^/s@]+\.[^/s@]+$/.test(value)) {
            return "이메일 형식이 올바르지 않습니다.";
          }
        },
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <InputField
          label="이메일"
          placeholder="이메일을 입력해주세요."
          value={value}
          onChangeText={onChange}
          error={error?.message}
        />
      )}
    />
  );
};

export default EmailInput;
