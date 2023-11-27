export class Ability {
  constructor(
    public name: string,
    public url: string,
    public isHidden: boolean,
    public effect?: string
  ) {}
}
