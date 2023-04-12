namespace PostsAPI.Models
{
    public class Post
    {
        public Guid PostId { get; set; }
        public string? Title { get; set; }
        public string? Body { get; set; }
        public string? CreatedBy { get; set; }
    }
}
