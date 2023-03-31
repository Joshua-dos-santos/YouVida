using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TagAPI.Models;

namespace TagAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostTagController : ControllerBase
    {
        private readonly ApplicationContext context;

        public PostTagController(ApplicationContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return this.Ok(await this.context.PostTags.ToListAsync());
        }


        [HttpGet("{postTagId:guid}")]
        public async Task<IActionResult> GetById(Guid postTagId)
        {
            return this.Ok(await this.context.PostTags.Where(x => x.PostTagId == postTagId).FirstOrDefaultAsync());
        }

        [HttpPost("")]
        public async Task<IActionResult> Create(PostTag postTag)
        {
            await this.context.Tags.AddAsync(postTag);
            await this.context.SaveChangesAsync();
            return this.Ok(postTag);
        }

        [HttpPut("")]
        public async Task<IActionResult> Update(PostTag postTag)
        {
            this.context.Tags.Update(postTag);
            await this.context.SaveChangesAsync();
            return this.Ok(postTag);
        }

        [HttpDelete("{postTagId:guid}")]
        public async Task<IActionResult> Delete(Guid postTagId)
        {
            var postTag = await this.context.PostTags.Where(x => x.PostTagId == postTagId).FirstAsync();
            this.context.Tags.Remove(postTag);
            return this.Ok(await this.context.SaveChangesAsync());
        }
    }
}
