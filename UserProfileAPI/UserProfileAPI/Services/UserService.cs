using Microsoft.EntityFrameworkCore;
using Polly;
using RabbitMQ.Client;
using System.Text;
using UserProfileAPI.Models;
using UserProfileAPI.Services.Interfaces;

namespace UserProfileAPI.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationContext context;

        public UserService(ApplicationContext context)
        {
            this.context = context;
        }

        public async Task<List<User>> GetUsers()
        {
            List<User> users = await this.context.User.ToListAsync();
            return users;
        }

        public async Task<User>GetUserById(string userId)
        {
            var user = await this.context.User.Where(x => x.UserId == userId).FirstOrDefaultAsync();
            if (user == null)
            {
                throw new NullReferenceException("there is no user with this ID");
            }
            return user;
        }

        public async Task<User> CreateUser(User user)
        {
            user.CreatedAt = DateTime.Now;
            if (await this.context.User.ContainsAsync(user))
            {
                return user;
            }
            await this.context.User.AddAsync(user);
            await this.context.SaveChangesAsync();
            return user;
        }

        public async Task<User> UpdateUser(User user)
        {
            this.context.User.Update(user);
            await this.context.SaveChangesAsync();
            return user;
        }

        public async Task<bool> DeleteUser(string userId)
        {
            try
            {
                var user = await this.context.User.Where(x => x.UserId == userId).FirstAsync();
                this.context.User.Remove(user);
                var userFollows = await context.UserFollower.Where(x => x.UserId == userId || x.FollowerId == userId).ToListAsync();
                if (userFollows != null && userFollows.Count() != 0)
                {
                    foreach (var x in userFollows)
                    {
                        context.UserFollower.Remove(x);
                    }
                }

                ConnectionFactory connectionFactory = new ConnectionFactory();
                connectionFactory.Uri = new Uri("#{RMQCONNECTIONSTRING}#");
                using (var connection = connectionFactory.CreateConnection())
                {
                    var channel = connection.CreateModel();
                    channel.ExchangeDeclare("userExchange", ExchangeType.Topic, true);

                    var body = Encoding.Unicode.GetBytes(userId.ToString());

                    channel.BasicPublish("userExchange", "userDelete", null, body);
                }
                await this.context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
            
        }
    }
}
