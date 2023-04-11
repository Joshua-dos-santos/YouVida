using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserProfileAPI.Models;

namespace UserProfileAPI.Controllers
{
    [ApiController]
    [Route("api/users/[controller]")]
    public class UserPostController : Controller
    {
        private readonly ApplicationContext context;

        public UserPostController(ApplicationContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return this.Ok(await this.context.UserPost.ToListAsync());
        }


        [HttpGet("{userpostId:guid}")]
        public async Task<IActionResult> GetById(Guid userpostId)
        {
            return this.Ok(await this.context.UserPost.Where(x => x.UserPostId == userpostId).FirstOrDefaultAsync());
        }

        [HttpPost("")]
        public async Task<IActionResult> Create(UserPost userPost)
        {
            await this.context.UserPost.AddAsync(userPost);
            await this.context.SaveChangesAsync();
            return this.Ok(userPost);
        }

        [HttpPut("")]
        public async Task<IActionResult> Update(UserPost userPost)
        {
            this.context.UserPost.Update(userPost);
            await this.context.SaveChangesAsync();
            return this.Ok(userPost);
        }

        [HttpDelete("{userpostId:guid}")]
        public async Task<IActionResult> Delete(Guid userpostId)
        {
            var postTag = await this.context.UserPost.Where(x => x.UserPostId == userpostId).FirstAsync();
            this.context.UserPost.Remove(postTag);
            return this.Ok(await this.context.SaveChangesAsync());
        }
    }
}
