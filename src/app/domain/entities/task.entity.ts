export class Task {
  constructor(
    public id: string,
    public title: string,
    public categoryId?: string,
    public completed: boolean = false
  ) {}

  static create(title: string, categoryId?: string): Task {
    const id = this.generateUUID();
    return new Task(id, title, categoryId);
  }

  private static generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
