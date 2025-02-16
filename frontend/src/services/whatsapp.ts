const WHATSAPP_API_BASE = '/api/whatsapp';

export const whatsappService = {
  async getChats() {
    const response = await fetch(`${WHATSAPP_API_BASE}/chats`);
    return response.json();
  },

  async getMessages(chatId: string) {
    const response = await fetch(`${WHATSAPP_API_BASE}/chats/${chatId}/messages`);
    return response.json();
  },

  async sendMessage(chatId: string, text: string) {
    const response = await fetch(`${WHATSAPP_API_BASE}/chats/${chatId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    return response.json();
  }
};