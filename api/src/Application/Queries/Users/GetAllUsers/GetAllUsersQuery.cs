using API.src.Application.Common.DTOs.Users;
using API.src.Application.Common.Pagination;
using MediatR;

namespace API.src.Application.Queries.Users.GetAllUsers
{
    public class GetAllUsersQuery : IRequest<PaginatedResult<UserResponseDto>>
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 25;
    }
}