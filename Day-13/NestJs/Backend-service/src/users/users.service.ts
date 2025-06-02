import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../DTO/createUser.dto';
import { UpdateUserDto } from '../DTO/updateUser.dto';
import { User, UserDocument } from '../Schema/user.schema'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    const res = await this.userModel.find().lean();
    return res;
  }

  async findById(id: string)  {    
    return this.userModel.findById(id);
  }
//: Promise<UserDocument>
  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<boolean> {
    await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    return true;
  }

  // async remove(id: string): Promise<UserDocument> {
  async remove(id: string){
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
