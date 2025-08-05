using API.src.Application.Commands.Users;
using API.src.Application.DTOs.Users.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Mapster;

namespace API.src.Api.Controllers.Users
{
    [ApiController]
    [Route("api/users")]
    public class UserWriteController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UserWriteController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // POST /api/users/register
        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterUserDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Username))
                throw new ArgumentException("Username is required.");

            if (string.IsNullOrWhiteSpace(dto.Email))
                throw new ArgumentException("Email is required.");

            if (string.IsNullOrWhiteSpace(dto.Password))
                throw new ArgumentException("Password is required.");

            var command = dto.Adapt<RegisterUserCommand>();

            await _mediator.Send(command);
            return NoContent();
        }

        // POST /api/users/login
        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginUserDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Identifier))
                throw new ArgumentException("Username or Email is required.");

            if (string.IsNullOrWhiteSpace(dto.Password))
                throw new ArgumentException("Password is required.");

            var command = dto.Adapt<LoginUserCommand>();

            var result = await _mediator.Send(command);
            return Ok(result);
        }
    }
}