using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTOs.Auth
{
        public class RegisterDTO
        {
            [Required(ErrorMessage = "Username is required.")]
            public string? Username { get; set; }

            [Required(ErrorMessage = "Email is required.")]
            [EmailAddress(ErrorMessage = "Invalid email format.")]
            public string? Email { get; set; }

            [Required(ErrorMessage = "Password is required.")]
            [MinLength(6, ErrorMessage = "Password must be at least 6 characters.")]
            public string? Password { get; set; }

            [Required(ErrorMessage = "ConfirmPassword is required.")]
            [Compare("Password", ErrorMessage = "Passwords do not match.")]
            public string? ConfirmPassword { get; set; }
        }
    }
