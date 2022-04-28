using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.ToDoList
{
    public partial class Create
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
                context.ToDoList.Add(request.ToDo);
                if (!(await context.SaveChangesAsync(cancellationToken) > 0))
                    return Result<Unit>.Failure("Failed to create task");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}