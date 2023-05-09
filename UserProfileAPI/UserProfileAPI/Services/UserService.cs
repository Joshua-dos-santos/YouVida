using Microsoft.EntityFrameworkCore;
using Polly;
using RabbitMQ.Client;
using System.Text;

namespace UserProfileAPI.Services
{
    public class UserService
    {
        private readonly ApplicationContext context;

        public UserService(ApplicationContext context)
        {
            this.context = context;
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

                var connectionFactory = new ConnectionFactory()
                {
                    HostName = "host.docker.internal",
                    Port = 5672,
                    UserName = "guest",
                    Password = "guest",
                };
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
