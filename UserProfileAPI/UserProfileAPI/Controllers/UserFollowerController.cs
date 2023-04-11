using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserProfileAPI.Models;

namespace UserProfileAPI.Controllers
{
    [ApiController]
    [Route("api/users/[controller]")]
    public class UserFollowerController : Controller
    {
        private readonly ApplicationContext context;

        public UserFollowerController(ApplicationContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return this.Ok(await this.context.UserFollower.ToListAsync());
        }


        [HttpGet("{userFollowerId:guid}")]
        public async Task<IActionResult> GetById(Guid userFollowerId)
        {
            return this.Ok(await this.context.UserFollower.Where(x => x.UserFollowerId == userFollowerId).FirstOrDefaultAsync());
        }

        [HttpPost("")]
        public async Task<IActionResult> Create(UserFollower userFollower)
        {
            await this.context.UserFollower.AddAsync(userFollower);
            await this.context.SaveChangesAsync();
            return this.Ok(userFollower);
        }

        [HttpPut("")]
        public async Task<IActionResult> Update(UserFollower userFollower)
        {
            this.context.UserFollower.Update(userFollower);
            await this.context.SaveChangesAsync();
            return this.Ok(userFollower);
        }

        [HttpDelete("{userFollowerId:guid}")]
        public async Task<IActionResult> Delete(Guid userFollowerId)
        {
            var userFollower = await this.context.UserFollower.Where(x => x.UserFollowerId == userFollowerId).FirstAsync();
            this.context.UserFollower.Remove(userFollower);
            return this.Ok(await this.context.SaveChangesAsync());
        }
    }
}