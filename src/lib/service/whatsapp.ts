import axios from "axios";
import { format } from "date-fns";

class WhatsappServiceClass {
  readonly phoneNumberId = process.env.META_PHONE_NUMBER_ID!;
  readonly accessToken = process.env.META_TOKEN!;
  constructor() {}

  async sendReminderTemplate(to: string, name: string, bills: Bill[]) {
    const contasFormatadas = bills.slice(0, 5).map((bill) => {
      const descricao = bill.description;
      const vencimento = format(bill.dueDate, "dd/MM/yyyy");
      const valor = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(bill.amount));

      return `📌 ${descricao} - 📅 *${vencimento}* - 💰*${valor}*`;
    });

    const parameters = [
      { type: "text", text: name?.trim() || "Cliente" },
      ...Array.from({ length: 5 }, (_, i) => ({
        type: "text",
        text: contasFormatadas[i] || " ",
      })),
    ];

    try {
      const response = await axios.post(
        `https://graph.facebook.com/v22.0/${this.phoneNumberId}/messages`,
        {
          messaging_product: "whatsapp",
          to: `55${to}`,
          type: "template",
          template: {
            name: "notificacao_contas",
            language: { code: "pt_BR" },
            components: [
              {
                type: "body",
                parameters,
              },
            ],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Template enviado:", response.data);
    } catch (err: any) {
      console.error(
        "Erro ao enviar template:",
        err.response?.data || err.message
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

      console.log("Mensagem enviada com sucesso:", response.data);
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
