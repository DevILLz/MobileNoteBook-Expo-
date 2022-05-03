
using Application.Core;
using Domain;

namespace Application.Interfaces
{
    public interface ITodoRepository
    {
        Task<Result<bool>> Create(ToDo todo);
        Task<Result<ToDo>> Details(Guid id);
        Task<Result<bool>> Edit(ToDo todo);
        Task<Result<bool>> Delete(Guid id);
        Task<Result<IEnumerable<ToDo>> >List();
    }
}
