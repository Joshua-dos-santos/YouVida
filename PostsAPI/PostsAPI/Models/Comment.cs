namespace PostsAPI.Models
{
    public class Comment
    {
        public Guid CommentId { get; set; }
        public Guid PostId { get; set; }
        public Guid UserId { get; set; }
        public string? Body { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
