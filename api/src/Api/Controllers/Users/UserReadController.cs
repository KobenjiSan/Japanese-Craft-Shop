using API.src.Application.Queries.Users.GetAllLikedByUser;
using Microsoft.AspNetCore.Mvc;
using MediatR;

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
    }
}