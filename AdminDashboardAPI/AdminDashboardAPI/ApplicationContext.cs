using Microsoft.EntityFrameworkCore;
using TagAPI.Models;
using System.Collections.Generic;

namespace TagAPI
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions options)
            : base(options)
        {
        }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<PostTag> PostTags { get; set; }
    }
}
