namespace UserProfileAPI.Models
{
    public class UserFollower
    {
        public Guid UserFollowerId { get; set; }
        public string? UserId { get; set; }
        public string? FollowerId { get; set; }
    }
}
