using Application.Core;
using MediatR;
using Persistence;

namespace Application.ToDoList
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
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
                var task = await context.ToDoList.FindAsync(request.Id);
                context.ToDoList.Remove(task);

                if (!(await context.SaveChangesAsync(cancellationToken) > 0))
                    return Result<Unit>.Failure("Failed to delete task");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}