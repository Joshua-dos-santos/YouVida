using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PostsAPI.Models;

namespace PostsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LikedPostController : ControllerBase
    {
        private readonly ApplicationContext context;

        public LikedPostController(ApplicationContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return this.Ok(await this.context.LikedPosts.ToListAsync());
        }


        [HttpGet("{likedPostId:guid}")]
        public async Task<IActionResult> GetById(Guid likedPostId)
        {
            return this.Ok(await this.context.LikedPosts.Where(x => x.LikedPostId == likedPostId).FirstOrDefaultAsync());
        }

        [HttpPost("")]
        public async Task<IActionResult> Create(LikedPost likedpost)
        {
            await this.context.LikedPosts.AddAsync(likedpost);
            await this.context.SaveChangesAsync();
            return this.Ok(likedpost);
        }

        [HttpPut("")]
        public async Task<IActionResult> Update(LikedPost likedpost)
        {
            this.context.LikedPosts.Update(likedpost);
            await this.context.SaveChangesAsync();
            return this.Ok(likedpost);
        }

        [HttpDelete("{likedpostId:guid}")]
        public async Task<IActionResult> Delete(Guid likedpostId)
        {
            var likedPost = await this.context.LikedPosts.Where(x => x.PostId == likedpostId).FirstAsync();
            this.context.LikedPosts.Remove(likedPost);
            return this.Ok(await this.context.SaveChangesAsync());
        }
    }
}
