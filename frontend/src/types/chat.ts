export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  hasNewMessage: boolean;
  labels: string[];
}

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOutgoing: boolean;
  status: 'sent' | 'delivered' | 'read';
}