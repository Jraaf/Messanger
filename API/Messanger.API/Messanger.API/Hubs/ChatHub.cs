using Messanger.API.Models;
using Microsoft.AspNetCore.SignalR;

namespace Messanger.API.Hubs;

public class ChatHub : Hub
{
    private readonly IDictionary<string, UserConnection> _connection;

    public ChatHub(IDictionary<string, UserConnection> connections)
    {
        _connection = connections;
    }

    public async Task JoinGroup(UserConnection userConnection)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.ChatRoom!);

        _connection[Context.ConnectionId] = userConnection;

        await Clients.Group(userConnection.ChatRoom!)
                     .SendAsync("ReceiveMessage", "OpenReplay", $"{userConnection.UserName} has joined the group", DateTime.Now);

        // Notifies connected users in the group about the new member.
        await NotifyConnectedUsersInGroup(userConnection.ChatRoom!);
    }

    public async Task SendChatMessage(string message)
    {
        if (_connection.TryGetValue(Context.ConnectionId, out UserConnection userGroupConnection))
        {
            // Checks if the current user's connection ID exists in the _connection dictionary.

            await Clients.Group(userGroupConnection.ChatRoom!)
                         .SendAsync("ReceiveMessage", userGroupConnection.UserName, message, DateTime.Now);
            // Sends a message to all clients in the specified chat group.
        }
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        if (_connection.TryGetValue(Context.ConnectionId, out UserConnection groupConnection))
        {
            Clients.Group(groupConnection.ChatRoom!)
                   .SendAsync("ReceiveMessage", "OpenReplay", $"{groupConnection.UserName} has left the group", DateTime.Now);

            NotifyConnectedUsersInGroup(groupConnection.ChatRoom!);
        }

        return base.OnDisconnectedAsync(exception);
    }

    public Task NotifyConnectedUsersInGroup(string group)
    {
        // Retrieve a list of connected users in the specified group from the _connection dictionary
        var connectedUsers = _connection.Values
            .Where(connection => connection.ChatRoom == group)
            .Select(connection => connection.UserName);

        // Send an update message to all clients in the specified chat group with the list of connected users
        return Clients.Group(group).SendAsync("ConnectedUser", connectedUsers);
    }
}

