import { colors } from "@/constants";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

// PressableProps 타입을 확장하여 prop 속성을 정의함.
// onPress 등을 일일이 추가할 필요가 없어짐
interface CustomButtonProps extends PressableProps {
  label: string;
  size?: "medium" | "large";
  variant?: "filled" | "outlined" | "standard";
}

const CustomButton = ({
  label,
  size = "large",
  variant = "filled",
  ...props
}: CustomButtonProps) => {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.container,
        styles[size],
        styles[variant],
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles[variant]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  large: {
    width: "100%",
    height: 44,
  },
  medium: {},
  filled: {
    backgroundColor: colors.ORANGE_600,
    fontSize: 14,
    fontWeight: "bold",
    color: colors.WHITE,
  },
  outlined: {
    backgroundColor: colors.WHITE,
    fontSize: 14,
    fontWeight: "bold",
    color: colors.ORANGE_600,
    borderWidth: 1,
    borderColor: colors.ORANGE_600,
  },
  standard: {
    backgroundColor: colors.WHITE,
    fontSize: 14,
    fontWeight: "bold",
    color: colors.ORANGE_600,
  },
  pressed: {
    opacity: 0.8,
  },
});

export default CustomButton;
