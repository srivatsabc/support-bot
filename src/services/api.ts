import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

export interface ChatRequest {
  input: string;
  persona: string;
  session_id?: string;
}

export interface ChatResponse {
  result: string;
  session_id: string;
  transaction_id: string;
}

export const chatApi = {
  sendMessage: async (input: string, sessionId?: string): Promise<ChatResponse> => {
    try {
      const response = await axios.post<ChatResponse>(
        `${API_BASE_URL}/chat-management/chats`,
        {
          input,
          persona: 'l2',
          ...(sessionId && { session_id: sessionId })
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to get response from AI');
    }
  },

  sendFeedback: async (transactionId: string, isPositive: boolean) => {
    try {
      await axios.post(`${API_BASE_URL}/chat-management/feedback`, {
        transaction_id: transactionId,
        feedback: isPositive ? 'positive' : 'negative'
      });
    } catch (error) {
      console.error('Error sending feedback:', error);
    }
  }
};