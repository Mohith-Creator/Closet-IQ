import { auth } from "../../firebase";

export const getAuthHeaders = async (isMultipart = false) => {
  const token = await auth.currentUser?.getIdToken();

  return {
    Authorization: `Bearer ${token}`,
    ...(isMultipart && {
      "Content-Type": "multipart/form-data",
    }),
  };
};