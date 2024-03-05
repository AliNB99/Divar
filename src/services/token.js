import api from "src/configs/api";
import { getCookie } from "src/utils/cookies";

const getNewToken = async () => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) return;
  try {
    const response = await api.post("/auth/check-refresh-token", {
      refreshToken,
    });
    return { response };
  } catch (error) {
    return { error };
  }
};

export { getNewToken };
