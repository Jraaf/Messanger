using Messanger.API.Models;
using Microsoft.AspNetCore.SignalR;

namespace Messanger.API.Hubs;

public class ChatHub:Hub
{
    public async Task JoinChat(UserConnection connection)
    {
        await Clients.All
            .SendAsync("RecieveMessage", "admin",$"{connection.UserName} has joined the chat.");
    }

    public async Task JoinSpecificChat(UserConnection connection)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatRoom);
        await Clients.Group(connection.ChatRoom).
            SendAsync("RecieveMessage","admin",$"{connection.UserName} has joined the chat.");
    }

}
