import { jsPDF } from "jspdf";
import { User } from "../types";
import { SettingsService } from "./settingsService";

export const ContractService = {
  // Método auxiliar privado para gerar o documento
  _createContractDoc: (student: User) => {
    const doc = new jsPDF();
    const settings = SettingsService.getSettings(); 
    const lineHeight = 7;
    let cursorY = 20;

    const addText = (text: string, fontSize: number = 10, fontStyle: string = 'normal', align: 'left' | 'center' | 'right' = 'left') => {
      doc.setFont("helvetica", fontStyle);
      doc.setFontSize(fontSize);
      
      const splitText = doc.splitTextToSize(text, 170);
      
      if (align === 'center') {
        doc.text(text, 105, cursorY, { align: 'center' });
      } else if (align === 'right') {
        doc.text(text, 190, cursorY, { align: 'right' });
      } else {
        doc.text(splitText, 20, cursorY);
      }
      
      cursorY += (splitText.length * lineHeight) + 2;
    };

    const today = new Date();
    const startDate = student.joinDate.split('-').reverse().join('/');
    const joinDateObj = new Date(student.joinDate);
    const endDateObj = new Date(joinDateObj);
    endDateObj.setFullYear(endDateObj.getFullYear() + 1);
    const endDate = endDateObj.toLocaleDateString('pt-BR');
    
    const userAddress = student.address || 'Endereço não informado no cadastro';

    addText("CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE ATIVIDADE FÍSICA", 14, "bold", "center");
    cursorY += 10;

    addText("IDENTIFICAÇÃO DAS PARTES", 11, "bold");
    const partiesText = `CONTRATADA: ${settings.name.toUpperCase()}, inscrita no CNPJ sob o nº ${settings.cnpj}, com sede na ${settings.address}, telefone ${settings.phone}, email ${settings.email}.\n\nCONTRATANTE: ${student.name.toUpperCase()}, portador(a) do email ${student.email}, residente e domiciliado em ${userAddress}.`;
    addText(partiesText);
    cursorY += 5;

    addText("CLÁUSULA 1ª - DO OBJETO", 11, "bold");
    addText("O presente contrato tem como objeto a prestação de serviços de condicionamento físico nas modalidades de TREINAMENTO FUNCIONAL e CORRIDA DE RUA, nas dependências da CONTRATADA ou em locais externos designados por esta.");

    addText("CLÁUSULA 2ª - DA DURAÇÃO", 11, "bold");
    addText(`O presente contrato terá vigência de 12 (doze) meses, iniciando-se em ${startDate} e encerrando-se em ${endDate}.`);

    addText("CLÁUSULA 3ª - DO PAGAMENTO", 11, "bold");
    const formattedFee = settings.monthlyFee.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    addText(`Pela prestação dos serviços, o(a) CONTRATANTE pagará à CONTRATADA o valor mensal de ${formattedFee}, com vencimento todo dia 05 de cada mês.`);

    addText("CLÁUSULA 4ª - DAS OBRIGAÇÕES DO ALUNO", 11, "bold");
    addText("O(A) CONTRATANTE declara estar em plenas condições de saúde para a prática de atividades físicas, comprometendo-se a apresentar atestado médico no prazo de 15 dias e a realizar as avaliações físicas periódicas agendadas pela academia.");

    addText("CLÁUSULA 5ª - DA FREQUÊNCIA E AVALIAÇÕES", 11, "bold");
    addText("A evolução do(a) CONTRATANTE será monitorada através de sistema digital, onde serão registrados a frequência e os resultados das avaliações físicas. O acesso a estes dados é disponibilizado via WebApp exclusivo.");

    addText("CLÁUSULA 6ª - DA RESCISÃO", 11, "bold");
    addText("O cancelamento antecipado deste contrato implica em multa de 10% sobre o valor das parcelas restantes.");

    cursorY += 10;
    addText("E, por estarem assim justos e contratados, firmam o presente instrumento.", 10, "normal");

    cursorY += 20;
    const footerDate = `São Paulo, ${today.toLocaleDateString('pt-BR')}`;
    addText(footerDate, 10, "normal", "right");

    cursorY += 30;
    doc.line(20, cursorY, 90, cursorY);
    doc.line(110, cursorY, 180, cursorY);
    cursorY += 5;
    
    doc.setFontSize(8);
    doc.text(settings.name.toUpperCase(), 55, cursorY, { align: "center" });
    doc.text(student.name.toUpperCase(), 145, cursorY, { align: "center" });

    return doc;
  },

  // Baixa o arquivo PDF diretamente para o computador
  generateContract: (student: User) => {
    const doc = ContractService._createContractDoc(student);
    doc.save(`Contrato_Personal_${student.name.replace(/\s+/g, '_')}.pdf`);
  },

  // Retorna o DataURI (String Base64) para salvar no banco
  getContractDataUri: (student: User): string => {
    const doc = ContractService._createContractDoc(student);
    return doc.output('datauristring');
  }
};