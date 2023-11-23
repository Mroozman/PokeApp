export class MoveDetail {
  constructor(
    public name: string,
    public type: string,
    public accuracy: number,
    public description: string,
    public power?: number
  ) {}
}
