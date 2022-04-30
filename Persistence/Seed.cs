using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (!context.ToDoList.Any())
            {
                var now = DateTime.Now;

                var tasks = new List<ToDo>
                {
                    new ToDo
                    {
                        Description = "Send out 100 responses to vacancies",
                        IsCompleted = false,
                        IsImportant = true,
                        CreationDate = new DateTime(now.Year, now.Month <= 1 ? 1 : now.Month - 1, 1),
                        DeadLine = now,
                    },
                    new ToDo
                    {
                        Description = "Get nice job",
                        IsCompleted = false,
                        IsImportant = true,
                        CreationDate = DateTime.Parse("28.04.2022"),
                        DeadLine = now,
                    },
                    new ToDo
                    {
                        Description = "Complete trial period",
                        IsCompleted = false,
                        IsImportant = true,
                        CreationDate = now,
                        DeadLine = now.AddMonths(3),
                    },
                    new ToDo
                    {
                        Description = "Become an architect",
                        IsCompleted = false,
                        IsImportant = true,
                        CreationDate = now,
                        DeadLine = now.AddYears(5),
                    },
                };
   

                await context.ToDoList.AddRangeAsync(tasks);
                await context.SaveChangesAsync();
            }
        }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsImportant { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime DeadLine { get; set; }
    }
}
