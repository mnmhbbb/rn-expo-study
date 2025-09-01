import { Controller, useFormContext } from "react-hook-form";
import { TextInputProps } from "react-native";

import InputField from "@/components/InputField";

interface PasswordInputProps {
  submitBehavior?: TextInputProps["submitBehavior"];
}

const PasswordInput = ({ submitBehavior = "blurAndSubmit" }: PasswordInputProps) => {
  const { control, setFocus } = useFormContext();

  return (
    <Controller
      name="password"
      control={control}
      rules={{
        validate: (value: string) => {
          if (value.length === 0) {
            return "비밀번호를 입력해주세요.";
          }
          if (value.length < 8) {
            return "비밀번호는 8자 이상이어야 합니다.";
          }
        },
      }}
      // render는 react-hook-form의 Controller가 렌더링 될 때 실행되는 함수로,
      // ref는 Controller가 제공하는 입력 요소 참조(reference)
      render={({ field: { ref, value, onChange }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          textContentType="oneTimeCode" // Automatic Strong Password cover view text 방지
          secureTextEntry
          returnKeyType="next"
          submitBehavior={submitBehavior}
          onSubmitEditing={() => setFocus("passwordConfirm")}
          value={value}
          onChangeText={onChange}
          error={error?.message}
        />
      )}
    />
  );
};

export default PasswordInput;
