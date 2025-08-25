using AutoMapper;
using Common;
using Microsoft.AspNetCore.Mvc;
using Model;
using Service.Common;
using System.Web.Http.ModelBinding;
using WebAPI.DTOs.Auth;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IMapper _mapper;

    public AuthController(IUserService userService, IMapper mapper)
    {
        _userService = userService;
        _mapper = mapper;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDTO request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new ErrorResponseDTO
            {
                Error = "Invalid input data.",
                Details = string.Join("; ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage))
            });
        }

        try
        {
            var user = _mapper.Map<User>(request);
            await _userService.RegisterAsync(user, request.Password);
            return Ok(new { message = "Registration successful." });
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new ErrorResponseDTO
            {
                Error = "Registration failed.",
                Details = ex.Message
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ErrorResponseDTO
            {
                Error = "Unexpected error during registration.",
                Details = ex.Message
            });
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDTO request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new ErrorResponseDTO
            {
                Error = "Invalid input data.",
                Details = string.Join("; ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage))
            });
        }

        try
        {
            var result = await _userService.LoginAsync(request.Email, request.Password);

            if (result == null)
            {
                return NotFound(new ErrorResponseDTO
                {
                    Error = "User not found or incorrect credentials."
                });
            }

            return Ok(result);
        }
        catch (InvalidOperationException ex)
        {
            return Unauthorized(new ErrorResponseDTO
            {
                Error = "Login failed.",
                Details = ex.Message
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ErrorResponseDTO
            {
                Error = "Unexpected error during login.",
                Details = ex.Message
            });
        }
    }
}
