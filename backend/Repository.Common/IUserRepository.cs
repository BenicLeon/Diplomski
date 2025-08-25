using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace Repository.Common
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<User?> GetByEmailAsync(string email);

        Task<User?> GetByIdAsync(Guid id);
        Task AddAsync(User user);

        Task<bool> UpdateUserAsync(User user);

        Task<bool> DeleteUserAsync(Guid id);
    }
}
