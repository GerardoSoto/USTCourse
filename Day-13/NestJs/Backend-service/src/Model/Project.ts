export default class implements IProject {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  contractTypeId: number | undefined;
  contractSignedOn: Date;
  budget: number;
  isActive: boolean;
  /**
   *
   */
  constructor(name:string, desceription:string, imageUrl: string, contractTypeId: number, budget: number, isActive: boolean) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.description = desceription;
    this.imageUrl = imageUrl;
    this.contractTypeId = contractTypeId;
    this.contractSignedOn =  new Date();
    this.budget = budget;
    this.isActive = isActive;
  }
}
