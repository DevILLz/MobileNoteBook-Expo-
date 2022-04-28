using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.ToDoList
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public ToDo ToDo { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var task = await context.ToDoList.FindAsync(request.ToDo.Id);
                if (task == null) return null;

                // без автоћаппера
                task.Description = request.ToDo.Description;
                task.IsCompleted = request.ToDo.IsCompleted;
                task.IsImportant = request.ToDo.IsImportant;
                task.DeadLine = request.ToDo.DeadLine;


                if (!(await context.SaveChangesAsync(cancellationToken) > 0))
                    return Result<Unit>.Failure("Failed to edit task");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}