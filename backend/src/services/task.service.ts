import { TaskModel } from "../models/task.model";

export default class TaskService {
    async create(task: { userId: string; title: string; desc: string }) {
        const newTask = await TaskModel.create({
            userId: task.userId,
            title: task.title,
            desc: task.desc,
        });

        return newTask;
    }

    async list() {
        const tasksList = await TaskModel.find().lean();
        return tasksList.map(({ _id, ...t }) => ({
            ...t,
            id: _id.toString(),
        }));
    }

    async getByUserId(userId: string) {
        const tasksList = await TaskModel.find({ userId }).lean();
        return tasksList.map(({ __v, _id, ...t }) => ({
            ...t,
            id: _id.toString(),
            userId: userId.toString(),
        }));
    }

    async getById(id: string) {
        const task = await TaskModel.findById(id).lean();
        if (!task) return null;
        return {
            ...task,
            id: task._id.toString(),
            userId: task.userId.toString(),
        };
    }

    async delete(id: string) {
        return TaskModel.deleteOne({ _id: id });
    }

    async update(id: string, task: { title: string; desc: string }) {
        return await TaskModel.findByIdAndUpdate(
            id,
            {
                title: task.title,
                desc: task.desc,
            },
            {
                new: true,
            },
        ).lean();
    }
}
