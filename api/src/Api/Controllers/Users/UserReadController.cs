using API.src.Application.Queries.Users.GetAllLikedByUser;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using API.src.Application.Queries.Users.GetLikedProductsByUser;
using Microsoft.AspNetCore.Authorization;
using API.src.Application.Common.Pagination;
using API.src.Application.Common.DTOs.Users;
using Microsoft.AspNetCore.Mvc.RazorPages;
using API.src.Application.Queries.Users.GetAllUsers;

namespace API.src.Api.Controllers.Users
{
    [ApiController]
    [Route("api/users")]
    public class UserReadController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UserReadController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET /api/users/liked
        [HttpGet("liked")]
        public async Task<ActionResult<AllLikedByUserResponseDto>> GetAllLikedByUser()
        {
            var query = new GetAllLikedByUserQuery { };
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        // GET /api/users/liked-list
        [HttpGet("liked-list")]
        public async Task<ActionResult<GetLikedProductsByUserResponseDto>> GetLikedProductsByUser()
        {
            var query = new GetLikedProductsByUserQuery { };
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        // GET /api/users
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<PaginatedResult<UserResponseDto>>> GetAllUsers(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 25
        )
        {
            var query = new GetAllUsersQuery
            {
                Page = page,
                PageSize = pageSize
            };

            var result = await _mediator.Send(query);
            return Ok(result);
        }
    }
}