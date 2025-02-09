import { Convo } from './convo';

export class Chat {
  private nameSet = false;

  constructor(
    public id: string = '',
    public modelName: string = '',
    public name: string = '',
    public convo: Convo[] = [],
    public date: Date = new Date(),
    public isFavourite: boolean = false
  ) {}

  public addNewConvo(convo: Convo) {
    this.convo.push(convo);

    if (!this.nameSet) {
      this.setName(this.convo[0].content.substring(0, 30));
      this.nameSet = true;
    }
  }

  public addContent(content: string) {
    this.convo[this.convo.length - 1].content += content;
  }

  public setName(newName: string) {
    this.name = newName;
  }

  public printChat(): void {
    console.log(this.name);
  }
}
