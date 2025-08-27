import { useToast } from "@/hooks/use-toast";

export function useEmailToast() {
  const { toast } = useToast();

  const showSuccessToast = (message: string) => {
    toast({
      title: "Email cadastrado!",
      description: message,
      variant: "default",
      duration: 5000,
    });
  };

  const showErrorToast = (message: string) => {
    toast({
      title: "Erro ao cadastrar",
      description: message,
      variant: "destructive",
      duration: 5000,
    });
  };

  const showRateLimitToast = (message: string) => {
    toast({
      title: "Muitas tentativas",
      description: message,
      variant: "warning",
      duration: 10000,
    });
  };

  const showBotDetectedToast = () => {
    toast({
      title: "Acesso negado",
      description: "Atividade suspeita detectada. Tente novamente.",
      variant: "destructive",
      duration: 8000,
    });
  };

  const showValidationErrorToast = (message: string) => {
    toast({
      title: "Dados inválidos",
      description: message,
      variant: "warning",
      duration: 6000,
    });
  };

  const showNetworkErrorToast = () => {
    toast({
      title: "Erro de conexão",
      description: "Verifique sua conexão com a internet e tente novamente.",
      variant: "info",
      duration: 8000,
    });
  };

  return {
    showSuccessToast,
    showErrorToast,
    showRateLimitToast,
    showBotDetectedToast,
    showValidationErrorToast,
    showNetworkErrorToast,
  };
}
