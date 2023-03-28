namespace UserProfileAPI.Models
{
    public class User
    {
        public Guid UserId { get; set; }
        public string? Email { get; set; }
        public string? Name { get; set; }
        public DateTime Birthdate { get; set; }
        public string? Profilepic { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastLogin { get; set; }
        public string? Bio { get; set; }
    }
}
