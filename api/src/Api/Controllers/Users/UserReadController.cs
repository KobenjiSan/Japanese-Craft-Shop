using MediatR;
using Microsoft.AspNetCore.Mvc;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using API.src.Application.DTOs.Users.Responses;
using API.src.Application.DTOs.Responses;
using API.src.Application.Queries.Users;

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
        [HttpGet("/liked")]
        public async Task<ActionResult<AllLikedByUserResponseDto>> GetAllLikedByUser()
        {
            var query = new GetAllLikedByUserQuery { };
            var result = await _mediator.Send(query);
            return Ok(result);
        }
    }
}