using Microsoft.AspNetCore.Connections;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Polly;
using RabbitMQ.Client;
using System.Data.SqlTypes;
using System.Net;
using System.Text;
using System.Text.Encodings.Web;
using UserProfileAPI.Models;
using UserProfileAPI.Services;
using UserProfileAPI.Services.Interfaces;

namespace UserProfileAPI.Controllers
{
    [ApiController]
    [Route("api/users/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService service)
        {
            this.userService = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return this.Ok(await this.userService.GetUsers());
        }


        [HttpGet("{userId}")]
        public async Task<IActionResult> GetById(string userId)
        {
            return this.Ok(await this.userService.GetUserById(userId));
        }

        [HttpPost("")]
        public async Task<IActionResult> Create(User user)
        { 
            return this.Ok(await this.userService.CreateUser(user));
        }

        [HttpPut("")]
        public async Task<IActionResult> Update(User user)
        { 
            return this.Ok(await this.userService.UpdateUser(user));
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> Delete(string userId)
        {
            bool Succes = await this.userService.DeleteUser(userId);
            if (Succes)
            {
                return this.Ok();
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
