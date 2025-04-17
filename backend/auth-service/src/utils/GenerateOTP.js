export const generateOTP = async () => {
    return await Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");
};
