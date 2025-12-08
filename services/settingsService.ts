
import { AcademySettings } from "../types";

const SETTINGS_KEY = 'personal_settings';

const DEFAULT_SETTINGS: AcademySettings = {
    name: 'Studio Personal Ltda',
    cnpj: '12.345.678/0001-99',
    address: 'Rua do Fitness, 100 - Centro, São Paulo - SP',
    phone: '(11) 99999-9999',
    email: 'contato@studio.com',
    representativeName: 'Treinador Alexandre',
    mercadoPagoPublicKey: '',
    mercadoPagoAccessToken: '',
    monthlyFee: 150.00, // Valor padrão
    inviteCode: 'PERSONAL2024' // Código padrão inicial
};

export const SettingsService = {
    getSettings: (): AcademySettings => {
        const stored = localStorage.getItem(SETTINGS_KEY);
        if (stored) {
            return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
        }
        return DEFAULT_SETTINGS;
    },

    saveSettings: (settings: AcademySettings) => {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    }
};
