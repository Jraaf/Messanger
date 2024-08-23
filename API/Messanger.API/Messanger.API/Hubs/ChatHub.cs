using Messanger.API.Models;
using Microsoft.AspNetCore.SignalR;

namespace Messanger.API.Hubs;

public class ChatHub(IDictionary<string, UserConnection> _connection) : Hub
{
    public async Task JoinChat(UserConnection connection)
    {
        await Clients.All
            .SendAsync("RecieveMessage", "admin", $"{connection.UserName} has joined the chat.");
    }

    public async Task JoinSpecificChat(UserConnection connection)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatRoom!);
        await Clients.Group(connection.ChatRoom!).
            SendAsync("RecieveMessage", "admin", $"{connection.UserName} has joined the chat.");
        await SendConnectedUser(connection.ChatRoom!);
    }
    public async Task SendMessage(string message)
    {
        if (_connection.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
        {
            await Clients.Group(userConnection.ChatRoom)
                    .SendAsync("RecieveMessage", userConnection.UserName, message);
        }
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        if (!_connection.TryGetValue(Context.ConnectionId, out UserConnection connection))
        {
            return base.OnDisconnectedAsync(exception);
        }
        Clients.Group(connection.ChatRoom!)
            .SendAsync("RecieveMessage", "admin", $"{connection.UserName} has left the chat.");
        SendConnectedUser(connection.ChatRoom!);
        return base.OnDisconnectedAsync(exception);
    }

    private Task SendConnectedUser(string room)
    {
        var users = from v in _connection.Values
                    where v.ChatRoom == room
                    select v;
        return Clients.Group(room).SendAsync("ConnectedUser", users);
    }
}
