using Application.ToDoList;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace TestForMonarchy.Controllers
{
    public class ToDoController : BaseAPIController
    {
        [HttpGet]
        public async Task<IActionResult> Getnotes()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
        [HttpPost]
        public async Task<IActionResult> Createnote(ToDo toDo)
        {
            return HandleResult(await Mediator.Send(new Create.Command { ToDo = toDo }));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Editnote(Guid id, ToDo toDo)
        {
            toDo.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { ToDo = toDo }));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletenote(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
