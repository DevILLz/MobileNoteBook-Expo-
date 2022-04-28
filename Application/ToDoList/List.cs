using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ToDoList
{
    public class List
    {
        public class Query : IRequest<Result<List<ToDo>>> { }
        public class Handler : IRequestHandler<Query, Result<List<ToDo>>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }
            public async Task<Result<List<ToDo>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var list = await context.ToDoList.ToListAsync(cancellationToken);

                return Result<List<ToDo>>.Success(list);
            }
        }
    }
}