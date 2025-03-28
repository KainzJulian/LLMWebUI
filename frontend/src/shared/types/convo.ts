export class Convo {
  public content: string;
  public role: 'system' | 'user' | 'assistant';

  constructor(convo: Partial<Convo>) {
    this.content = convo.content || '';
    this.role = convo.role || 'system';
  }
}

export class ConvoResponse {
  public model: string;
  public created_at: Date;
  public done_reason: string;
  public done: boolean;
  public total_duration: number;
  public response: Convo;

  constructor(convoResponse: Partial<ConvoResponse>) {
    this.model = convoResponse.model || '';
    this.created_at = convoResponse.created_at || new Date();
    this.done_reason = convoResponse.done_reason || '';
    this.done = convoResponse.done || false;
    this.total_duration = convoResponse.total_duration || 0;
    this.response = convoResponse.response || new Convo({});
  }
}
