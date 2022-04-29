namespace Domain
{
    public class ToDo
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsImportant { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime? DeadLine { get; set; }
    }
}
