export interface StartGameResponse {
  id: string;
  message: string;
}

export interface SendMessageRequest {
  gameId: string;
  message: string;
}

export interface SendMessageResponse {
  aiMessage: string;
  trustLevel: number;
  paranoiaLevel: number;
  codeRevealed: boolean;
}
