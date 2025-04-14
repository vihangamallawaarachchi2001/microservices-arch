export const useToast = () => {
    const toast = (options: any) => {
      console.log("Toast:", options);
      // Logic to display a toast notification
    };
    return { toast };
  };