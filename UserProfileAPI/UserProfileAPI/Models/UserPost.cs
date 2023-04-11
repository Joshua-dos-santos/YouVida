namespace UserProfileAPI.Models
{
    public class UserPost
    {
        public Guid UserPostId { get; set; }
        public string? UserId { get; set; }
        public Guid PostId { get; set; }
    }
}
