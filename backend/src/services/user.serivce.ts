import { User } from "../schemas/user.schema";
import { UserModel } from "../models/user.model";

export default class UserService {
    async create(user: User) {
        return UserModel.create({
            email: user.email,
            hash: await Bun.password.hash(user.password),
        });
    }

    async list() {
        return {
            users: await UserModel.find().lean(),
            total: await UserModel.countDocuments,
        };
    }

    async getById(id: string) {
        return UserModel.findById(id).lean();
    }

    async getByEmail(email: string) {
        return UserModel.findOne({ email }).lean();
    }

    async delete(id: string) {
        return UserModel.deleteOne({ __id: id });
    }

    async update(id: string, user: User) {
        return await UserModel.findByIdAndUpdate(
            id,
            {
                email: user.email,
                hash: await Bun.password.hash(user.password),
            },
            {
                new: true,
            },
        ).lean({ virtuals: true });
    }
}
