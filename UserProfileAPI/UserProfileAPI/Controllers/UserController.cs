using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlTypes;
using System.Net;
using System.Text.Encodings.Web;
using UserProfileAPI.Models;

namespace UserProfileAPI.Controllers
{
    [ApiController]
    [Route("api/users/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationContext context;

        public UserController(ApplicationContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return this.Ok(await this.context.User.ToListAsync());
        }


        [HttpGet("{userId}")]
        public async Task<IActionResult> GetById(string userId)
        {
            return this.Ok(await this.context.User.Where(x => x.UserId == userId).FirstOrDefaultAsync());
        }

        [HttpPost("")]
        public async Task<IActionResult> Create(User user)
        {
            user.CreatedAt = DateTime.Now;
            if (await this.context.User.ContainsAsync(user))
            {
                return this.Ok(user);
            }
            await this.context.User.AddAsync(user);
            await this.context.SaveChangesAsync();
            return this.Ok(user);
        }

        [HttpPut("")]
        public async Task<IActionResult> Update(User user)
        {
            this.context.User.Update(user);
            await this.context.SaveChangesAsync();
            return this.Ok(user);
        }

        [HttpDelete("{userId:guid}")]
        public async Task<IActionResult> Delete(string userId)
        {
            var postTag = await this.context.User.Where(x => x.UserId == userId).FirstAsync();
            this.context.User.Remove(postTag);
            return this.Ok(await this.context.SaveChangesAsync());
        }
    }
}
