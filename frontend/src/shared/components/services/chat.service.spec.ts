import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ChatService } from './chat.service';
import { provideHttpClient } from '@angular/common/http';
import { Chat } from '../../types/chat';
import { Convo } from '../../types/convo';

describe('ChatService', () => {
  let service: ChatService;
  let convoList: Convo[];
  let chat: Chat;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatService, provideHttpClient(), provideHttpClientTesting()]
    });

    convoList = [
      { content: 'testConvo1', role: 'system' },
      { content: 'testConvo2', role: 'user' },
      { content: 'testConvo3', role: 'assistant' }
    ];

    chat = new Chat('testID', 'testModelName', 'testName', convoList, new Date(2000, 12), false);

    service = TestBed.inject(ChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the current chat to a different chat', () => {
    expect(service.currentChat).toBe(null);
    service.setCurrentChat(chat);

    expect(service.currentChat).toBe(chat);
  });

  it('should check if the chat is the current chat', () => {
    service.isCurrentChat(chat, service.chatList);

    expect(service.isCurrentChat(chat, service.chatList)).toBe(true);
  });
});
