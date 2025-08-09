using API.src.Application.Commands.Users.LikedProductUser;
using API.src.Application.Commands.Users.LoginUser;
using API.src.Application.Commands.Users.RegisterUser;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Mapster;
using Microsoft.AspNetCore.Authorization;

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
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterUserRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Username))
                throw new ArgumentException("Username is required.");

            if (string.IsNullOrWhiteSpace(request.Email))
                throw new ArgumentException("Email is required.");

            if (string.IsNullOrWhiteSpace(request.Password))
                throw new ArgumentException("Password is required.");

            var command = request.Adapt<RegisterUserCommand>();

            await _mediator.Send(command);
            return NoContent();
        }

        // POST /api/users/login
        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginUserRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Identifier))
                throw new ArgumentException("Username or Email is required.");

            if (string.IsNullOrWhiteSpace(request.Password))
                throw new ArgumentException("Password is required.");

            var command = request.Adapt<LoginUserCommand>();

            var result = await _mediator.Send(command);
            return Ok(result);
        }

        // PUT /api/users/like
        [HttpPut("like")]
        [Authorize]
        public async Task<ActionResult<LikeProductUserResponseDto>> LikeProductAsync([FromBody] LikeProductUserRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.ProductId))
                throw new ArgumentException("No valid product id supplied.");

            var command = request.Adapt<LikeProductUserCommand>();

            var result = await _mediator.Send(command);
            return Ok(result);
        }
    }

    // Request DTOs
    public record RegisterUserRequest
    {
        public string Username { get; init; } = string.Empty;
        public string Email { get; init; } = string.Empty;
        public string Password { get; init; } = string.Empty;
    }

    public record LoginUserRequest
    {
        public string Identifier { get; init; } = string.Empty;
        public string Password { get; init; } = string.Empty;
    }

    public record LikeProductUserRequest
    {
        public string ProductId { get; init; } = string.Empty;
    }
}