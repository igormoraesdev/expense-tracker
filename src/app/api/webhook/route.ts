import { NextRequest } from "next/server";

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ WEBHOOK VERIFICADO!");
    return new Response(challenge, { status: 200 });
  }

  return new Response("Falha na verificação", { status: 403 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("📩 Webhook recebido:", JSON.stringify(body, null, 2));

  // Verifica se há mudanças no webhook
  const change = body.entry?.[0]?.changes?.[0]?.value;

  if (!change) {
    return new Response("Nenhuma mudança encontrada", { status: 400 });
  }

  // 1️⃣ Se for um evento de mensagem interativa (clique no botão)
  if (change.messages) {
    const message = change.messages[0];

    if (message?.type === "button") {
      const userNumber = message.from;
      const userName = change.contacts?.[0]?.profile?.name || "Usuário";
      const buttonPayload = message.button.payload;

      console.log(
        `🖱️ ${userName} (${userNumber}) clicou no botão: ${buttonPayload}`
      );

      // Se for o botão de Opt-in, registrar o usuário
      if (buttonPayload === "Sim, quero receber") {
        console.log(`✅ ${userName} aceitou receber notificações!`);

        // Aqui você pode salvar no banco de dados ou acionar outra lógica
      }
    }

    return new Response("EVENT_RECEIVED", { status: 200 });
  }

  // 2️⃣ Se for um evento de status da mensagem (ex: mensagem foi lida)
  if (change.statuses) {
    const statusEvent = change.statuses[0];
    console.log(
      `📩 Status da mensagem: ${statusEvent.status} para ${statusEvent.recipient_id}`
    );

    return new Response("STATUS_RECEIVED", { status: 200 });
  }

  return new Response("EVENTO NÃO TRATADO", { status: 200 });
}
