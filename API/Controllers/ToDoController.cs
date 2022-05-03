using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ToDoController : BaseAPIController
    {
        private readonly ITodoRepository repo;
        public ToDoController(ITodoRepository repo) => this.repo = repo;

        [HttpGet]
        public async Task<IActionResult> Get() => HandleResult(await repo.List());

        [HttpPost]
        public async Task<IActionResult> Create(ToDo toDo) => HandleResult(await repo.Create(toDo));

        [HttpGet("{id}")]
        public async Task<IActionResult> GetToDo(Guid id) => HandleResult(await repo.Details(id));

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Guid id, ToDo toDo)
        {
            toDo.Id = id;
            return HandleResult(await repo.Edit(toDo));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id) => HandleResult(await repo.Delete(id));
    }
}
