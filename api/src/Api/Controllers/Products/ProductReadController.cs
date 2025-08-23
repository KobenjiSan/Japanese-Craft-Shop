using API.src.Application.Common.DTOs.Products;
using API.src.Application.Common.Pagination;
using API.src.Application.Queries.Products.GetAllProducts;
using API.src.Application.Queries.Products.GetLikedByList;
using API.src.Application.Queries.Products.GetMostLikedProduct;
using API.src.Application.Queries.Products.GetProductById;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace API.src.Api.Controllers.Products
{
    [ApiController]
    [Route("api/products")]
    public class ProductReadController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProductReadController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET /api/products
        [HttpGet]
        public async Task<ActionResult<PaginatedResult<ProductResponseDto>>> GetAllProductsAsync(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? category = null,
            [FromQuery] int minPrice = 0,
            [FromQuery] int maxPrice = 150,
            [FromQuery] bool stock = false,
            [FromQuery] bool featured = false,
            [FromQuery] bool newest = false
        // TODO: Add search 
        // TODO: Add sort direction
        )
        {
            var query = new GetAllProductsQuery
            {
                Page = page,
                PageSize = pageSize,
                Category = category,
                MinimumPrice = minPrice,
                MaximumPrice = maxPrice,
                SortNewest = newest,
                FilterStock = stock,
                FilterFeatured = featured
            };
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        // GET /api/products/{id}
        [HttpGet("{id}", Name = "GetProductById")]
        public async Task<ActionResult<ProductResponseDto>> GetProductByIdAsync([FromRoute] string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new ArgumentException("Product ID is required.");

            if (!ObjectId.TryParse(id, out _))
                throw new ArgumentException("Product ID doesn't match required format.");

            var query = new GetProductByIdQuery { ProductId = id };
            var result = await _mediator.Send(query);

            return Ok(result);
        }

        // GET /api/products/likedByList/{id}
        [Authorize(Roles = "Admin")]
        [HttpGet("likedByList/{id}")]
        public async Task<ActionResult<LikedByListResponseDto>> GetLikedByListAsync([FromRoute] string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new ArgumentException("Product ID is required.");

            if (!ObjectId.TryParse(id, out _))
                throw new ArgumentException("Product ID doesn't match required format.");

            var query = new GetLikedByListQuery { ProductId = id };
            var result = await _mediator.Send(query);

            return Ok(result);
        }

        // GET /api/products/most-liked
        [HttpGet("most-liked")]
        public async Task<ActionResult<ProductResponseDto>> GetMostLikedProductAsync()
        {
            var query = new MostLikedProductQuery { };
            var result = await _mediator.Send(query);
            return Ok(result);
        }
    }
}