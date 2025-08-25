using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Model;
using Repository.Common;
using Service.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Common;

public class UserService : IUserService
{
    private readonly IUserRepository _repository;
    private readonly IConfiguration _config;

    public UserService(IUserRepository repository, IConfiguration config)
    {
        _repository = repository;
        _config = config;
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }
    public async Task<User> AddUserAsync(User user)
    {
        var existing = await _repository.GetByEmailAsync(user.Email);
        if (existing != null)
            throw new InvalidOperationException("Email already exists.");

        await _repository.AddAsync(user);
        return user;
    }


    public async Task RegisterAsync(User user, string plainPassword)
    {
        var existing = await _repository.GetByEmailAsync(user.Email);
        if (existing != null)
            throw new InvalidOperationException("Email already exists.");

        user.Id = Guid.NewGuid();
        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(plainPassword);
        user.Role = "User";

        await _repository.AddAsync(user);
    }

    public async Task<AuthResponse> LoginAsync(string email, string password)
    {
        var user = await _repository.GetByEmailAsync(email);
        if (user == null)
            return null;

        var isPasswordValid = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
        if (!isPasswordValid)
            throw new InvalidOperationException("Password doesn't match.");

        return new AuthResponse
        {
            Id = user.Id,
            Username = user.Username,
            Token = GenerateJwtToken(user),
            Role = user.Role
        };
    }
    public async Task<bool> UpdateUserAsync(User user, Guid id)
    {
        var existingUser = await _repository.GetByIdAsync(id);
        if (existingUser != null)
        {
            if (!string.IsNullOrWhiteSpace(user.Username))
            {
                existingUser.Username = user.Username;
            }

            if (!string.IsNullOrWhiteSpace(user.Email))
            {
                existingUser.Email = user.Email;
            }
          
            if (!string.IsNullOrWhiteSpace(user.PasswordHash))
            {
                existingUser.PasswordHash = user.PasswordHash;
            }
            await _repository.UpdateUserAsync(existingUser);
            return true;
        }
        else
        {
            return false;
        }
    }
    public async Task<bool> DeleteUserAsync(Guid id)
    {
      return  await _repository.DeleteUserAsync(id);
    }

    private string GenerateJwtToken(User user)
    {
        var claims = new[]
        {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Name, user.Username),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Role, user.Role),
        new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64)
    };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(int.Parse(_config["Jwt:TokenExpirationInMinutes"] ?? "60")),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

}
