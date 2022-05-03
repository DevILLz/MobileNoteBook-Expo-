using Application.Core;
using Application.Interfaces;
using Domain;
using System.Text.Json;

namespace Infrastructure
{
    public class TodoRepositoryWithoutDB : ITodoRepository
    {
        const string DATABASE_PATH = "TodoDB.json";
        private List<ToDo> context;

        public TodoRepositoryWithoutDB()
        {
            try
            {
                context = JsonSerializer.Deserialize<List<ToDo>>(File.ReadAllText(DATABASE_PATH));
            }
            catch
            {
                File.Create(DATABASE_PATH);
                context = Seed();
                Save().Wait();
            }
        }

        public async Task<Result<bool>> Create(ToDo todo)
        {
            context.Add(todo);
            if (!await Save())
                return Result<bool>.Failure("Failed to create task");
            return Result<bool>.Success(true);
        }

        public async Task<Result<bool>> Delete(Guid id)
        {
            var task = context.FirstOrDefault(x => x.Id == id);
            context.Remove(task);

            if (!await Save())
                return Result<bool>.Failure("Failed to delete task");
            return Result<bool>.Success(true);
        }

        public async Task<Result<ToDo>> Details(Guid id) => Result<ToDo>.Success(context.FirstOrDefault(x => x.Id == id));

        public async Task<Result<bool>> Edit(ToDo todo)
        {
            var task = context.FirstOrDefault(x => x.Id == todo.Id);
            if (task == null) return null;

            // без автоМаппера
            task.Description = todo.Description;
            task.IsCompleted = todo.IsCompleted;
            task.IsImportant = todo.IsImportant;
            task.DeadLine = todo.DeadLine;


            if (!await Save())
                return Result<bool>.Failure("Failed to edit task");
            return Result<bool>.Success(true);
        }

        public async Task<Result<IEnumerable<ToDo>>> List() => Result<IEnumerable<ToDo>>.Success(context.ToList());

        private List<ToDo> Seed()
        {
            List<ToDo> list = new();
            var now = DateTime.Now;
            list.AddRange(new List<ToDo>
                {
                    new ToDo
                    {
                        Id = Guid.NewGuid(),
                        Description = "Send out 100 responses to vacancies",
                        IsCompleted = false,
                        IsImportant = true,
                        CreationDate = new DateTime(now.Year, now.Month <= 1 ? 1 : now.Month - 1, 1),
                        DeadLine = now,
                    },
                    new ToDo
                    {
                        Id = Guid.NewGuid(),
                        Description = "Get nice job",
                        IsCompleted = false,
                        IsImportant = true,
                        CreationDate = DateTime.Parse("28.04.2022"),
                        DeadLine = now,
                    },
                    new ToDo
                    {
                        Id = Guid.NewGuid(),
                        Description = "Complete trial period",
                        IsCompleted = false,
                        IsImportant = true,
                        CreationDate = now,
                        DeadLine = now.AddMonths(3),
                    },
                    new ToDo
                    {
                        Id = Guid.NewGuid(),
                        Description = "Become an architect",
                        IsCompleted = false,
                        IsImportant = true,
                        CreationDate = now,
                        DeadLine = now.AddYears(5),
                    },
                });
            return list;
        }
        private async Task<bool> Save()
        {
            return await Task.Factory.StartNew(() =>
            {
                try
                {
                    File.WriteAllText(DATABASE_PATH, JsonSerializer.Serialize(context));
                    return true;
                }
                catch
                {
                    return false;
                }

            });
        }
    }
}