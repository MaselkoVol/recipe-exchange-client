export const fileToDataURL = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        resolve(e.target?.result);
      } else {
        reject(new Error("Failed to read file as Data URL"));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

export type FileWithDataURL = {
  file: File;
  dataURL: string;
};

export const fileToFileWithDataURL = async (file: File): Promise<FileWithDataURL> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        const res: FileWithDataURL = {
          file,
          dataURL: e.target?.result,
        };
        resolve(res);
      } else {
        reject(new Error("Failed to read file as Data URL"));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};
