using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TagAPI.Models;

namespace TagAPI.Controllers
{ 
    [ApiController]
    [Route("api/tag/[controller]")]
    public class TagController : ControllerBase
    {
        private readonly ApplicationContext context;

        public TagController(ApplicationContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return this.Ok(await this.context.Tags.ToListAsync());
        }


        [HttpGet("{tagId:guid}")]
        public async Task<IActionResult> GetById(Guid tagId)
        {
            return this.Ok(await this.context.Tags.Where(x => x.TagId == tagId).FirstOrDefaultAsync());
        }

        [HttpPost("")]
        public async Task<IActionResult> Create(Tag tag)
        {
            await this.context.Tags.AddAsync(tag);
            await this.context.SaveChangesAsync();
            return this.Ok(tag);
        }

        [HttpPut("")]
        public async Task<IActionResult> Update(Tag tag)
        {
            this.context.Tags.Update(tag);
            await this.context.SaveChangesAsync();
            return this.Ok(tag);
        }

        [HttpDelete("{tagId:guid}")]
        public async Task<IActionResult> Delete(Guid tagId)
        {
            var tag = await this.context.Tags.Where(x => x.TagId == tagId).FirstAsync();
            this.context.Tags.Remove(tag);
            return this.Ok(await this.context.SaveChangesAsync());
        }
    }
}
