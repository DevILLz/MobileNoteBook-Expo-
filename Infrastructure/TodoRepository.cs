using Application.Core;
using Application.Interfaces;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure
{
    public class TodoRepository : ITodoRepository
    {
        private DataContext context;

        public TodoRepository(DataContext context) => this.context = context;
        public async Task<Result<Guid>> Create(ToDo todo)
        {
            todo.Id = Guid.NewGuid();
            context.ToDoList.Add(todo);
            if (!(await context.SaveChangesAsync() > 0))
                return Result<Guid>.Failure("Failed to create task");
            return Result<Guid>.Success(todo.Id);
        }

        public async Task<Result<bool>> Delete(Guid id)
        {
            var task = await context.ToDoList.FindAsync(id);
            context.ToDoList.Remove(task);

            if (!(await context.SaveChangesAsync() > 0))
                return Result<bool>.Failure("Failed to delete task");
            return Result<bool>.Success(true);
        }

        public async Task<Result<ToDo>> Details(Guid id) => Result<ToDo>.Success(await context.ToDoList.FirstOrDefaultAsync(x => x.Id == id));

        public async Task<Result<bool>> Edit(ToDo todo)
        {
            var task = await context.ToDoList.FindAsync(todo.Id);
            if (task == null) return null;

            // без автоМаппера
            task.Description = todo.Description;
            task.IsCompleted = todo.IsCompleted;
            task.IsImportant = todo.IsImportant;
            task.DeadLine = todo.DeadLine;


            if (!(await context.SaveChangesAsync() > 0))
                return Result<bool>.Failure("Failed to edit task");
            return Result<bool>.Success(true);
        }

        public async Task<Result<IEnumerable<ToDo>>> List() => Result<IEnumerable<ToDo>>.Success(await context.ToDoList.ToListAsync());
    }
}