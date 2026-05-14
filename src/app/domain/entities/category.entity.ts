export class Category {
  constructor(
    public id: string,
    public name: string,
    public icon: string,
    public color: string
  ) {}

  static create(name: string, icon: string, color: string): Category {
    const id = this.generateUUID();
    return new Category(id, name, icon, color);
  }

  private static generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
