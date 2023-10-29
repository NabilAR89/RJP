export class StorageHelper {
  public get(key: string): string {
    const data = sessionStorage.getItem(key) as string;
    return data;
  }

  public set(key: string, data: any): void {
    sessionStorage.setItem(key, data);
  }

  public remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  public check(key: string): boolean {
    if (this.get(key) === null) {
      return false;
    }
    return true;
  }

  public clearAll(): void {
    sessionStorage.clear();
  }
}
