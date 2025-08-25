using Microsoft.EntityFrameworkCore;
using Model;
using Repository.Common;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return  await _context.Users.Where(u => u.Role == "User").ToListAsync();
        }
        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }
        public async Task<User?> GetByIdAsync(Guid id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }
        public async Task AddAsync(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateUserAsync(User user)
        {
            if (user != null)
            {
                _context.Update(user);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
        public async Task<bool> DeleteUserAsync(Guid id)
        {
            var userToDelete = await _context.Users.FirstOrDefaultAsync(x => x.Id == id && x.Role == "User");
            if (userToDelete != null)
            {
                _context.Users.Remove(userToDelete);
                _context.SaveChanges();
                return true;
            }
               return false;
            
        }
    }
}
