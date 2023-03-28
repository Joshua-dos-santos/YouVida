using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using UserProfileAPI.Models;

namespace UserProfileAPI
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions options)
            : base(options)
        {
        }
        public DbSet<User> User { get; set; }
        public DbSet<UserPost> UserPost { get; set; }
    }
}
