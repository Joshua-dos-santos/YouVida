namespace UserProfileAPI.Models
{
    public class UserPost
    {
        public Guid UserPostId { get; set; }
        public Guid UserId { get; set; }
        public Guid PostId { get; set; }
    }
}
