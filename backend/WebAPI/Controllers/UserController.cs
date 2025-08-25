using AutoMapper;
using Common;
using Microsoft.AspNetCore.Mvc;
using Model;
using Service.Common;
using System.Web.Http.ModelBinding;
using WebAPI.DTOs.User;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IMapper _mapper;

    public UserController(IUserService userService, IMapper mapper)
    {
        _userService = userService;
        _mapper = mapper;
    }

    [HttpPost("addUser")]
    public async Task<IActionResult> AddUser([FromBody] CreateUserDTO userDTO)
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
            var user = _mapper.Map<User>(userDTO);
            await _userService.AddUserAsync(user);
            return CreatedAtAction(nameof(GetAll), new { id = user.Id }, user);
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new ErrorResponseDTO
            {
                Error = "User creation failed.",
                Details = ex.Message
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ErrorResponseDTO
            {
                Error = "Unexpected error during user creation.",
                Details = ex.Message
            });
        }
    }

    [HttpPut("edit/{id}")]
    public async Task<IActionResult> UpdateUser(Guid id, [FromBody] UserDTO user)
    {
        try
        {
            var success = await _userService.UpdateUserAsync(_mapper.Map<User>(user), id);
            if (success)
                return Ok(new { message = "User updated successfully." });

            return NotFound(new ErrorResponseDTO
            {
                Error = "User not found."
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ErrorResponseDTO
            {
                Error = "Unexpected error during update.",
                Details = ex.Message
            });
        }
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteUser(Guid id)
    {
        try
        {
            var success = await _userService.DeleteUserAsync(id);
            if (success)
                return Ok(new { message = "User deleted successfully." });

            return NotFound(new ErrorResponseDTO
            {
                Error = "User not found."
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ErrorResponseDTO
            {
                Error = "Unexpected error during deletion.",
                Details = ex.Message
            });
        }
    }

    [HttpGet("users")]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var response = await _userService.GetAllAsync();
            return Ok(response);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ErrorResponseDTO
            {
                Error = "Unexpected error fetching users.",
                Details = ex.Message
            });
        }
    }
}
