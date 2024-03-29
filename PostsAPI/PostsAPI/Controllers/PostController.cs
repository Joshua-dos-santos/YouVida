﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PostsAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PostsAPI.Controllers
{
    [ApiController]
    [Route("api/posts/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly ApplicationContext context;

        public PostController(ApplicationContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        { 
            return this.Ok(await this.context.Posts.OrderByDescending(x => x.CreatedAt).ToListAsync());
        }

       
        [HttpGet("{postId:guid}")]
        public async Task<IActionResult> GetById(Guid postId)
        {
            return this.Ok(await this.context.Posts.Where(x => x.PostId == postId).FirstOrDefaultAsync());
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetByUser(string userId)
        {
            return this.Ok(await this.context.Posts.Where(x => x.CreatedBy == userId).OrderByDescending(x => x.CreatedAt).ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Create(Post post)
            {
            post.CreatedAt = DateTime.Now.AddHours(2).ToString("dd/MM/yyyy HH:mm");
            await this.context.Posts.AddAsync(post);
            await this.context.SaveChangesAsync();
            return this.Ok(post);
        }

        [HttpPut("")]
        public async Task<IActionResult> Update(Post post)
        {
            this.context.Posts.Update(post);
            await this.context.SaveChangesAsync();
            return this.Ok(post);
        }

        [HttpDelete("{postId:guid}")]
        public async Task<IActionResult> Delete(Guid postId)
        {
            var post = await this.context.Posts.Where(x => x.PostId == postId).FirstAsync();
            this.context.Posts.Remove(post);
            return this.Ok(await this.context.SaveChangesAsync());
        }
    }
}
