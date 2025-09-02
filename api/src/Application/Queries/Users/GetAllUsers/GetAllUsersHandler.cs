using API.src.Application.Common.DTOs.Users;
using API.src.Application.Common.Pagination;
using API.src.Application.Services.Users.Interfaces;
using Mapster;
using MediatR;

namespace API.src.Application.Queries.Users.GetAllUsers
{
    public class GetAllUsersHandler : IRequestHandler<GetAllUsersQuery, PaginatedResult<UserResponseDto>>
    {
        private readonly IUserReadService _userReadService;
        
        public GetAllUsersHandler(IUserReadService userReadService)
        {
            _userReadService = userReadService;
        }

        public async Task<PaginatedResult<UserResponseDto>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
        {
            var allUsers = await _userReadService.GetAllUsersAsync();

            var pagedUsers = allUsers
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToList();

            var dtoUsers = pagedUsers.Select(u => new UserResponseDto
                {
                    UserId = u.Id,
                    Username = u.Username,
                    Email = u.Email,
                    LikedProductIds = u.LikedProductIds ?? new List<string>(),
                    Role = u.Role
                }).ToList();

            return new PaginatedResult<UserResponseDto>(
                dtoUsers,
                allUsers.Count,
                request.Page,
                request.PageSize
            );
        }
    }
}