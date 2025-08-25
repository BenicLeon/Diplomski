using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTOs.User
{
    public class UserDTO
    {
        [RegularExpression(@"^$|^[^@\s]+@[^@\s]+\.[^@\s]+$", ErrorMessage = "Invalid email format.")]
        public string? Email { get; set; }
        public string? Username { get; set; }

        [MinLength(6, ErrorMessage = "Password must be at least 6 characters.")]
        public string? Password { get; set; }

    }
}
