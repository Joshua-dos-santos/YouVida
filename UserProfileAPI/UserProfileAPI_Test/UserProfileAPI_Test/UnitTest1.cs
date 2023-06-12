using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using UserProfileAPI.Controllers;
using UserProfileAPI.Models;
using UserProfileAPI.Services;
using UserProfileAPI.Services.Interfaces;

namespace UserProfileAPI_Test
{
    [TestFixture]
    public class UsersControllerTests
    {
        private UserController controller;
        private Mock<IUserService> userService;

        [SetUp]
        public void Setup()
        {
            userService = new Mock<IUserService>();
            controller = new UserController(userService.Object);
        }

        [Test]
        public async Task Get_ReturnsListOfUsers()
        {
            // Arrange
            var users = new List<User>()
            {
                new User { UserId = "user1", Username = "John Doe" },
                new User { UserId = "user2", Username = "Jane Smith" }
            };
            userService.Setup(r => r.GetUsers()).ReturnsAsync(users);

            // Act
            var result = await controller.Get();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(users, okResult.Value);
        }

        [Test]
        public async Task GetById_ExistingUserId_ReturnsUser()
        {
            // Arrange
            var userId = "user1";
            var user = new User { UserId = userId, Username = "John Doe" };
            userService.Setup(r => r.GetUserById(userId)).ReturnsAsync(user);

            // Act
            var result = await controller.GetById(userId);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(user, okResult.Value);
        }
    }
}