import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

/**
 * 키보드 표시 여부를 반환하는 훅
 * @returns {isKeyboardVisible: boolean}
 */
const useKeyboard = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const onShow = () => setIsKeyboardVisible(true);
    const onHide = () => setIsKeyboardVisible(false);

    const showListener = Keyboard.addListener("keyboardDidShow", onShow);
    const hideListener = Keyboard.addListener("keyboardDidHide", onHide);

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return { isKeyboardVisible };
};

export default useKeyboard;
