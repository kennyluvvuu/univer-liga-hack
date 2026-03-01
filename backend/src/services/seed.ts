import { UserModel } from "../models/user.model";
import { TaskModel } from "../models/task.model";
import { CommentModel } from "../models/comment.model";

export async function seedDatabase() {
    try {
        // Проверяем, есть ли уже пользователи
        const existingUsers = await UserModel.countDocuments();
        if (existingUsers > 0) {
            console.log("База данных уже содержит данные, пропускаем seed");
            return;
        }

        // Проверяем, есть ли уже отзывы
        const existingComments = await CommentModel.countDocuments();
        if (existingComments > 0) {
            console.log("Отзывы уже существуют, пропускаем создание отзывов");
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

        const createdTasks = await TaskModel.insertMany(mockTasks);
        console.log(`✅ Создано ${mockTasks.length} mock-задач`);

        // Создаем mock-отзывы
        const mockComments = [
            // Отзывы для Ивана Петрова (createdUsers[0]) - смешанные (score 2-4)
            {
                recipientId: createdUsers[0]._id,
                senderId: createdUsers[2]._id, // Алексей
                taskId: createdTasks[0]._id,
                score: 3,
                comment: "Иван хорошо организовал процесс, но сроки были немного сдвинуты.",
                tags: [
                    { title: "Хорошее ТЗ", type: "positive" as const },
                    { title: "Срыв сроков", type: "negative" as const }
                ],
                createdAt: new Date("2025-10-15")
            },
            {
                recipientId: createdUsers[0]._id,
                senderId: createdUsers[3]._id, // Елена
                taskId: createdTasks[1]._id,
                score: 4,
                comment: "Чётко поставлена задача, легко было работать по ТЗ.",
                tags: [
                    { title: "Хорошее ТЗ", type: "positive" as const },
                    { title: "Доброжелательность", type: "positive" as const }
                ],
                createdAt: new Date("2025-11-20")
            },
            {
                recipientId: createdUsers[0]._id,
                senderId: createdUsers[4]._id, // Дмитрий
                taskId: createdTasks[0]._id,
                score: 2,
                comment: "Задача была составлена нечётко, пришлось несколько раз уточнять детали.",
                tags: [
                    { title: "Отказал без причины", type: "negative" as const }
                ],
                createdAt: new Date("2025-12-05")
            },

            // Отзывы для Алексея Смирнова (createdUsers[2]) - в основном позитив (score 4-5)
            {
                recipientId: createdUsers[2]._id,
                senderId: createdUsers[0]._id, // Иван
                taskId: createdTasks[3]._id,
                score: 5,
                comment: "Алексей отлично реализовал API, всё работает как часы!",
                tags: [
                    { title: "Высокая экспертность", type: "positive" as const },
                    { title: "Подробно объяснил", type: "positive" as const }
                ],
                createdAt: new Date("2025-09-10")
            },
            {
                recipientId: createdUsers[2]._id,
                senderId: createdUsers[3]._id, // Елена
                taskId: createdTasks[4]._id,
                score: 5,
                comment: "Быстро исправил все баги, очень помог с интеграцией.",
                tags: [
                    { title: "Помог в дедлайн", type: "positive" as const },
                    { title: "Доброжелательность", type: "positive" as const }
                ],
                createdAt: new Date("2025-10-25")
            },
            {
                recipientId: createdUsers[2]._id,
                senderId: createdUsers[4]._id, // Дмитрий
                taskId: createdTasks[3]._id,
                score: 4,
                comment: "Качественная работа, небольшие замечания были устранены оперативно.",
                tags: [
                    { title: "Высокая экспертность", type: "positive" as const }
                ],
                createdAt: new Date("2025-11-15")
            },

            // Отзывы для Елены Козловой (createdUsers[3]) - нейтрально (score 3-4)
            {
                recipientId: createdUsers[3]._id,
                senderId: createdUsers[0]._id, // Иван
                taskId: createdTasks[5]._id,
                score: 4,
                comment: "Дизайн получился современным и удобным, команда довольна.",
                tags: [
                    { title: "Доброжелательность", type: "positive" as const },
                    { title: "Подробно объяснил", type: "positive" as const }
                ],
                createdAt: new Date("2025-10-01")
            },
            {
                recipientId: createdUsers[3]._id,
                senderId: createdUsers[2]._id, // Алексей
                taskId: createdTasks[5]._id,
                score: 3,
                comment: "Макеты хорошие, но потребовалось несколько итераций доработки.",
                tags: [
                    { title: "Хорошее ТЗ", type: "positive" as const }
                ],
                createdAt: new Date("2025-12-10")
            },

            // Отзывы для Дмитрия Новикова (createdUsers[4]) - немного негатив (score 2-3)
            {
                recipientId: createdUsers[4]._id,
                senderId: createdUsers[0]._id, // Иван
                taskId: createdTasks[6]._id,
                score: 2,
                comment: "Анализ был поверхностным, рекомендации не помогли улучшить метрики.",
                tags: [
                    { title: "Неверная рекомендация", type: "negative" as const },
                    { title: "Избегает задач", type: "negative" as const }
                ],
                createdAt: new Date("2025-11-01")
            },
            {
                recipientId: createdUsers[4]._id,
                senderId: createdUsers[2]._id, // Алексей
                taskId: createdTasks[6]._id,
                score: 3,
                comment: "Данные собраны, но выводы могли бы быть более глубокими.",
                tags: [
                    { title: "Грубость", type: "negative" as const }
                ],
                createdAt: new Date("2025-12-20")
            },
        ];

        await CommentModel.insertMany(mockComments);
        console.log(`✅ Создано ${mockComments.length} mock-отзывов`);

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
