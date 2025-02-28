import axios from "axios";
import { format } from "date-fns";

class WhatsappServiceClass {
  readonly phoneNumberId = process.env.META_PHONE_NUMBER_ID!;
  readonly accessToken = process.env.META_TOKEN!;
  constructor() {}

  generateMessage(billsList: Bill[], name: string): string {
    const listMessage = billsList
      .map(
        (bill) =>
          `📌 ${bill.description} - Vence em ${format(
            bill.dueDate,
            "dd/MM/yyyy"
          )} - ${new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(Number(bill.amount))}`
      )
      .join("\n");
    const message = `Oi ${name}, estou passando para te avisar sobre o vencimento dos seus boletos \n\n`;

    return `🔔 *Lembrete de Contas a Vencer*\n\n${message}${listMessage}\n\n💡 Não deixe suas contas vencerem!`;
  }

  async sendWhatsAppMessage(to: string, message: string) {
    try {
      const response = await axios.post(
        `https://graph.facebook.com/v22.0/${this.phoneNumberId}/messages`,
        {
          messaging_product: "whatsapp",
          to: `55${to}`,
          type: "text",
          text: { body: message },
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("WhatsApp message sent:", response.data);
    } catch (error: any) {
      console.error(
        "Error sending WhatsApp message:",
        error.response?.data || error.message
      );
    }
  }
  async sendWhatsAppInitialMessage(to: string) {
    try {
      const response = await axios.post(
        `https://graph.facebook.com/v22.0/${this.phoneNumberId}/messages`,
        {
          messaging_product: "whatsapp",
          to: `55${to}`,
          type: "template",
          template: { name: "welcome", language: { code: "pt_BR" } },
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("WhatsApp message sent:", response.data);
    } catch (error: any) {
      console.log(error);
      console.error(
        "Error sending WhatsApp message:",
        error.response?.data || error.message
      );
    }
  }
}

export const WhatsappService = new WhatsappServiceClass();
