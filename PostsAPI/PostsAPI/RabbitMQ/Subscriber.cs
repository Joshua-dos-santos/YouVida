using Microsoft.EntityFrameworkCore;
using PostsAPI.Interfaces;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;

namespace PostsAPI.RabbitMQ
{
    public class Subscriber : ISubscriber
    {
        private readonly IServiceScopeFactory serviceScopeFactory;
        public Subscriber(IServiceScopeFactory serviceScopeFactory)
        {
            this.serviceScopeFactory = serviceScopeFactory;
        }
        public void GetDeletedFromQueue()
        {
            string exchange = "userExchange";
            string routingKey = "userDelete";
            string queue = "user";

            ConnectionFactory connectionFactory = new ConnectionFactory();
            connectionFactory.Uri = new Uri("#{RMQCONNECTIONSTRING}#");

            IConnection connection = connectionFactory.CreateConnection();

            IModel channel = connection.CreateModel();
            channel.ExchangeDeclare(exchange, ExchangeType.Topic, true);

            channel.QueueDeclare(queue, true, false, false, null);
            channel.QueueBind(queue, exchange, routingKey);

            var consumer = new EventingBasicConsumer(channel);

            // define a callback function for incoming messages
            consumer.Received += async (model, ea) =>
            {
                var body = ea.Body.ToArray();
                string message = Encoding.Unicode.GetString(body);

                using (var scope = serviceScopeFactory.CreateScope())
                {
                    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationContext>();
                    var posts = await dbContext.Posts.Where(x => x.CreatedBy == message).ToListAsync();

                    if (posts != null && posts.Count() != 0)
                    {
                        foreach (var x in posts)
                        {
                            dbContext.Posts.Remove(x);
                        }
                        await dbContext.SaveChangesAsync();
                    }
                }
            };

            channel.BasicConsume(queue, true, consumer);
            return;
        }
    }
}
