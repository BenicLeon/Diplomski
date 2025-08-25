using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
namespace Service.Common

{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<User> AddUserAsync(User user);
        Task RegisterAsync(User user, string plainPassword);
        Task<AuthResponse> LoginAsync(string email, string password);

        Task<bool> UpdateUserAsync(User user, Guid id);

        Task<bool> DeleteUserAsync(Guid id);

    }
}
