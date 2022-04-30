using Application.ToDoList;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace TestForMonarchy.Controllers
{
    public class ToDoController : BaseAPIController
    {
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetToDo(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query()));
        }
        [HttpPost]
        public async Task<IActionResult> Create(ToDo toDo)
        {
            return HandleResult(await Mediator.Send(new Create.Command { ToDo = toDo }));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Guid id, ToDo toDo)
        {
            toDo.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { ToDo = toDo }));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
