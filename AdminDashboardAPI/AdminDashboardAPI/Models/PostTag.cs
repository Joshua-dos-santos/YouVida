namespace TagAPI.Models
{
    public class PostTag
    {
        public Guid PostTagId { get; set; }
        public Guid PostId { get; set; }
        public Guid TagId { get; set; }
    }
}
