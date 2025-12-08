
import { Payment } from "../types";
import { SettingsService } from "./settingsService";

export const MercadoPagoService = {
    /**
     * Simula a criação de uma preferência de pagamento e processamento
     */
    processPayment: async (payment: Payment): Promise<{ status: 'approved' | 'rejected', id: string }> => {
        const settings = SettingsService.getSettings();
        
        console.log("Iniciando pagamento via Mercado Pago...");
        console.log(`Valor: R$ ${payment.amount}`);
        
        // Verifica se há credenciais configuradas (apenas log para debug)
        if (settings.mercadoPagoPublicKey) {
            console.log("Usando Public Key configurada:", settings.mercadoPagoPublicKey);
        } else {
            console.log("Modo Simulação (Sem credenciais reais)");
        }

        // Simula delay de rede
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Retorna sucesso simulado
        return {
            status: 'approved',
            id: `mp_${Math.random().toString(36).substr(2, 9)}`
        };
    },

    /**
     * Simula a criação de uma assinatura recorrente (Preapproval)
     */
    createSubscription: async (studentEmail: string, amount: number): Promise<{ status: 'created', init_point: string, id: string }> => {
        const settings = SettingsService.getSettings();
        console.log(`Criando assinatura recorrente de R$ ${amount} para ${studentEmail}`);

        // Simula delay de rede
        await new Promise(resolve => setTimeout(resolve, 1500));

        return {
            status: 'created',
            id: `sub_${Math.random().toString(36).substr(2, 9)}`,
            init_point: 'https://www.mercadopago.com.br/subscriptions/checkout?pref_id=mock'
        };
    }
};
