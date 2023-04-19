namespace UserProfileAPI.Models
{
    public class User
    {
        public string? UserId { get; set; }
        public string? Email { get; set; }
        public string? Name { get; set; }
        public string? Profilepic { get; set; }
        public string? Username { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? LastLogin { get; set; }
        public string? Bio { get; set; }
    }
}
