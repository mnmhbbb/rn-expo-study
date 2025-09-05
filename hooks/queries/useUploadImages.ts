import { useMutation } from "@tanstack/react-query";

import { uploadImages } from "@/api/image";

const useUploadImages = () => {
  return useMutation({
    mutationFn: uploadImages,
  });
};

export default useUploadImages;
