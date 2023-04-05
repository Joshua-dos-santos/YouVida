using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PostsAPI.Models;

namespace PostsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly ApplicationContext context;

        public CommentController(ApplicationContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return this.Ok(await this.context.Comments.ToListAsync());
        }


        [HttpGet("{commentId:guid}")]
        public async Task<IActionResult> GetById(Guid commentId)
        {
            return this.Ok(await this.context.Comments.Where(x => x.CommentId == commentId).FirstOrDefaultAsync());
        }

        [HttpPost("")]
        public async Task<IActionResult> Create(Comment comment)
        {
            await this.context.Comments.AddAsync(comment);
            await this.context.SaveChangesAsync();
            return this.Ok(comment);
        }

        [HttpPut("")]
        public async Task<IActionResult> Update(Comment comment)
        {
            this.context.Comments.Update(comment);
            await this.context.SaveChangesAsync();
            return this.Ok(comment);
        }

        [HttpDelete("{commentId:guid}")]
        public async Task<IActionResult> Delete(Guid commentId)
        {
            var comment = await this.context.Comments.Where(x => x.CommentId == commentId).FirstAsync();
            this.context.Comments.Remove(comment);
            return this.Ok(await this.context.SaveChangesAsync());
        }
    }
}
