namespace PostsAPI.Models
{
    public class LikedPost
    {
        public Guid LikedPostId { get; set; }

        public Guid UserId { get; set; }

        public Guid PostId { get; set; }
    }
}
