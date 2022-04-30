using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ToDoList
{
    public class Details
    {
        public class Query : IRequest<Result<ToDo>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<ToDo>>
        {
            private DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<ToDo>> Handle(Query request, CancellationToken cancellationToken)
            {
                var todo = await context.ToDoList.FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<ToDo>.Success(todo);
            }
        }
    }
}