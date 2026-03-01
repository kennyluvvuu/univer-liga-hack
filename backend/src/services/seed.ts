import { UserModel } from "../models/user.model";
import { TaskModel } from "../models/task.model";

export async function seedDatabase() {
    try {
        // Проверяем, есть ли уже пользователи
        const existingUsers = await UserModel.countDocuments();
        if (existingUsers > 0) {
            console.log("База данных уже содержит данные, пропускаем seed");
            return;
        }

        console.log("Создаю mock-данные...");

        const mockUsers = [
            {
                name: "Иван Петров",
                role: "employee" as const,
                department: "Менеджмент",
                email: "ivan@example.com",
                id_crm: "CRM001",
                avatar: "https://i.pravatar.cc/150?u=ivan",
                hash: await Bun.password.hash("password123"),
            },
            {
                name: "Мария Сидорова",
                role: "director" as const,
                department: "Руководство",
                email: "maria@example.com",
                id_crm: "CRM002",
                avatar: "https://i.pravatar.cc/150?u=maria",
                hash: await Bun.password.hash("director123"),
            },
            {
                name: "Алексей Смирнов",
                role: "employee" as const,
                department: "Разработка",
                email: "alexey@example.com",
                id_crm: "CRM003",
                avatar: "https://i.pravatar.cc/150?u=alexey",
                hash: await Bun.password.hash("dev12345"),
            },
            {
                name: "Елена Козлова",
                role: "employee" as const,
                department: "Дизайн",
                email: "elena@example.com",
                id_crm: "CRM004",
                avatar: "https://i.pravatar.cc/150?u=elena",
                hash: await Bun.password.hash("design123"),
            },
            {
                name: "Дмитрий Новиков",
                role: "employee" as const,
                department: "Аналитика",
                email: "dmitry@example.com",
                id_crm: "CRM005",
                avatar: "https://i.pravatar.cc/150?u=dmitry",
                hash: await Bun.password.hash("analyst123"),
            },
        ];

        const createdUsers = await UserModel.insertMany(mockUsers);
        console.log(`✅ Создано ${mockUsers.length} mock-пользователей`);

        // Создаем mock-задачи для каждого пользователя
        const mockTasks = [
            {
                userId: createdUsers[0]._id,
                title: "Подготовить отчет за квартал",
                desc: "Собрать статистику по продажам и подготовить презентацию для руководства",
            },
            {
                userId: createdUsers[0]._id,
                title: "Провести собеседования",
                desc: "Откликнуться на резюме и провести первичные интервью кандидатов",
            },
            {
                userId: createdUsers[1]._id,
                title: "Утвердить бюджет",
                desc: "Рассмотреть и утвердить бюджет на следующий квартал",
            },
            {
                userId: createdUsers[2]._id,
                title: "Реализовать API для задач",
                desc: "Создать CRUD операции для управления задачами в системе",
            },
            {
                userId: createdUsers[2]._id,
                title: "Исправить баги в авторизации",
                desc: "Устранить проблемы с токенами и сессиями пользователей",
            },
            {
                userId: createdUsers[3]._id,
                title: "Обновить дизайн главной страницы",
                desc: "Создать новые макеты и согласовать с командой",
            },
            {
                userId: createdUsers[4]._id,
                title: "Анализ метрик продукта",
                desc: "Изучить данные и подготовить рекомендации по улучшению конверсии",
            },
        ];

        await TaskModel.insertMany(mockTasks);
        console.log(`✅ Создано ${mockTasks.length} mock-задач`);

        console.log("📧 Пароли для входа:");
        console.log("   ivan@example.com / password123");
        console.log("   maria@example.com / director123");
        console.log("   alexey@example.com / dev12345");
        console.log("   elena@example.com / design123");
        console.log("   dmitry@example.com / analyst123");
    } catch (error) {
        console.error("Ошибка при создании mock-данных:", error);
    }
}
