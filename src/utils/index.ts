export const createJWT = (username: string, password: string) => {
  const payload = { username, password, exp: Date.now() + 60 * 60 * 1000 }; // 1-hour expiry
  return btoa(JSON.stringify(payload));
};

export const decodeJWT = (token: string) => {
  try {
    const decoded = JSON.parse(atob(token));
    return decoded;
  } catch (e) {
    console.error("Invalid token:", e);
    return null;
  }
};

export const getBase64Images = async (files: FileList | null) => {
  if (!files) return;

  const base64Promises = Array.from(files).map((file) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result as string);
        } else {
          reject(new Error("Failed to convert file to Base64"));
        }
      };
      reader.onerror = () => reject(new Error("Error reading file"));
    });
  });

  try {
    const base64Images = await Promise.all(base64Promises);
    return base64Images;
  } catch (error) {
    console.error("Error converting files to Base64:", error);
  }
};
