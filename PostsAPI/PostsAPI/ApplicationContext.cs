using Microsoft.EntityFrameworkCore;
using PostsAPI.Models;
using System.Collections.Generic;

namespace PostsAPI
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions options)
            : base(options)
        {
        }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<LikedPost> LikedPosts { get; set; }

    }
}
