import {
    User,
    UserPreviewResponce,
    UserResponce,
} from "../schemas/user.schema";
import { UserModel } from "../models/user.model";

export default class UserService {
    async create(user: User): Promise<UserResponce> {
        const newUser = await UserModel.create({
            name: user.name,
            email: user.email,
            role: user.role,
            position: user.position,
            hash: await Bun.password.hash(user.password),
        });

        return newUser as UserResponce;
    }

    async list(): Promise<UserResponce[]> {
        const usersList = await UserModel.find().lean();
        return usersList.map(({ hash, __v, _id, ...u }) => ({
            ...u,
            id: _id.toString(),
        }));
    }

    async getById(id: string): Promise<UserResponce | null> {
        const user = await UserModel.findById(id).lean();
        if (!user) return null;
        return {
            id: user._id.toString(),
            email: user.email,
            position: user.position,
            role: user.role,
            avatar: user.avatar,
            id_crm: user.id_crm,
        };
    }

    async getByEmail(email: string) {
        return UserModel.findOne({ email }).lean();
    }

    async delete(id: string) {
        return UserModel.deleteOne({ _id: id });
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
