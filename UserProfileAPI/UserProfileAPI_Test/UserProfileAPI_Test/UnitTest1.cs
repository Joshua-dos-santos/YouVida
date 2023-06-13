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
    public class UserProfile_APITests
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

        [Test]
        public async Task Create_ValidUser_ReturnsOkResult()
        {
            // Arrange
            var user = new User { UserId = "user3", Username = "Alice" };
            userService.Setup(r => r.CreateUser(user)).ReturnsAsync(user);

            // Act
            var result = await controller.Create(user);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(user, okResult.Value);
        }

        [Test]
        public async Task Update_ValidUser_ReturnsOkResult()
        {
            // Arrange
            var user = new User { UserId = "user1", Username = "John Doe" };
            userService.Setup(r => r.UpdateUser(user)).ReturnsAsync(user);

            // Act
            var result = await controller.Update(user);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(user, okResult.Value);
        }

        [Test]
        public async Task Delete_ExistingUserId_ReturnsOkResult()
        {
            // Arrange
            var userId = "user1";
            userService.Setup(r => r.DeleteUser(userId)).ReturnsAsync(true);

            // Act
            var result = await controller.Delete(userId);

            // Assert
            Assert.IsInstanceOf<OkResult>(result);
        }

        [Test]
        public async Task Delete_NonExistingUserId_ReturnsBadRequestResult()
        {
            // Arrange
            var userId = "user3";
            userService.Setup(r => r.DeleteUser(userId)).ReturnsAsync(false);

            // Act
            var result = await controller.Delete(userId);

            // Assert
            Assert.IsInstanceOf<BadRequestResult>(result);
        }
    }
}